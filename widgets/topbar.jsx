export const refreshFrequency = 1000;

const query = {
    query: '{ monitors { id, focused, desktops { id, focused, windows { owner, focused } } }, system { battery { ischarging, percent }, wifi { ssid } } }'
};

export const command = `echo '${JSON.stringify(query)}' | http --json :3000/graphql`;

// current desktop

const focused = Object.assign({
    color: "#ededed",
    borderBottom: "2px solid #ededed"
});

function currentDesktopComponent(monitors) {
    try {
        const monitor = monitors.filter(m => m.focused === true)[0];
        return monitor.desktops.map((desktop) => <div style={desktop.focused === true ? focused : {} } className='p-1 px-2'>{desktop.id}</div>);
    } catch (error) {
        console.log(`currentDesktopComponent error: ${JSON.stringify(error)}`);
        return <div/>;
    }
}

function currentWindowComponent(monitors) {
    // TODO: why is desktop.windows null? should return empty array
    try {
        const monitor = monitors.filter(m => m.focused === true)[0];
        const desktop = monitor.desktops.filter(d => d.focused === true)[0];
        const windows = desktop.windows.filter(w => w.focused === true);
        const name = windows.length === 0 ? '' : windows[0].owner;

        return <div className='p-1'>{name}</div>;
    } catch (error) {
        console.log(`currentWindowComponent error: ${JSON.stringify(error)}`);
        return <div/>;
    }
}

function batteryComponent(battery) {

    const { ischarging, percent } = battery;

    if (percent === 0) {
        return <div/>;
    }

    const elements = [];

    if (ischarging) {
        elements.push(<div className = 'pt-1 pr-2 text-warning'></div>);
    }

    if (percent >= 90) {
        elements.push(
            <div className = 'pt-1 text-success'></div>
        );
    }
    else if (percent >= 50 && percent < 90) {
        elements.push(
            <div className = 'pt-1 text-success'></div>
        );
    }
    else if (percent < 50 && percent >= 25) {
        elements.push(
            <div className = 'pt-1 text-warning'></div>
        );
    }
    else if (percent < 25 && percent >= 15) {
        elements.push(
            <div className = 'pt-1 text-warning'></div>
        );
    }
    else if (percent < 15) {
        elements.push(
            <div className = 'pt-1 text-danger'></div>
        );
    }

    elements.push(<div className = 'pt-1 pl-1'>{percent}%</div>);
    return <div className = 'd-flex justify-content-start'>{elements}</div>;
}

const styles = {
    icon: {
        color: '#c27f7b',
        /* backgroundColor: "rgba(70 , 70, 70, 1)"*/
    },
    text: {
        /* backgroundColor: "rgba(50, 50, 50, 1)"*/
    },
    bar: {
        backgroundColor: 'rgba(20, 20, 20, 0.85)',
        color: '#aaa',
        font: '16px FuraCode Nerd Font',
        fontWeight: '600',
        color: '#aaa',
        '-webkit-font-smoothing': 'antialiased',
    }
}

function statusComponent(system) {
    const calendarIcon = <div className='pt-1 pr-1' style={styles.icon}></div>;
    const date = <div className='pt-1' style={styles.text}>{moment().format('ddd, MMM DD, Y')}</div>;
    const dateComponent = <div className='d-flex justify-content-start ml-3'>
        {calendarIcon}
        {date}
    </div>;

    const clockIcon = <div className='pt-1 pr-1' style={styles.icon}></div>;
    const time = <div className='pt-1' style={styles.text}>{moment().format('H:mm')}</div>;
    const timeComponent = <div className='d-flex justify-content-start ml-3 mr-2'>
        {clockIcon}
        {time}
    </div>;

    let wifiComponent;
    if (system.wifi.length === 0) {
        wifiComponent = <div/>;
    } else {
        const wifiIcon = <div className='pt-1' style={styles.icon}></div>;
        const wifiNetwork = system.wifi.length === 0 ? 'wired' : system.wifi[0].ssid;
        wifiComponent = <div className='d-flex justify-content-start mr-3'>
            {wifiIcon}
            <div className='p-1' style={styles.text}>{wifiNetwork}</div>
        </div>;
    }

    const battery = batteryComponent(system.battery);

    return [wifiComponent, battery, dateComponent, timeComponent ];
}


/* getVolume: (str) ->
 *   if str == "muted"
 *     return "<span class='volume'>&nbsp;&nbsp;</span>"
 *   else
 *     return "<span class='volume'>&nbsp;&nbsp;</span><span class='white'>#{str}&nbsp</span>"*/

export function render(props) {
    const parent = document.getElementById('topbar-jsx');
    parent.classList.add('col');

    const { monitors, system } = JSON.parse(props.output).data;
    //TODO: handle null monitors

    return (
        <div style={styles.bar} className='mt-1'>
            <div className="d-flex justify-content-between">
                <div className='d-flex justify-content-start' style={{minWidth: '33%'}}>
                    {currentDesktopComponent(monitors)}
                </div>
                <div className='d-flex justify-content-center' style={{minWidth: '33%'}}>
                    {currentWindowComponent(monitors)}
                </div>
                <div className='d-flex justify-content-end' style={{minWidth: '33%'}}>
                    {statusComponent(system)}
                </div>
            </div>
        </div>
    );
}
