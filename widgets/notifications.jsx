export const refreshFrequency = (60 * 1000 * 5);

const query = {
    query: '{btc: exchange(symbol: "BTC/USD", name: "coinmarketcap") { name, market { symbol, price } }, eth: exchange(symbol: "ETH/USD", name: "coinmarketcap") { name, market { symbol, price } }, jira(jql: "project = APII and status in (\\"In Progress\\", \\"Code Reviewing\\", Blocked, \\"QA Ready\\", \\"QA In Progress\\", \\"Ready For Production\\")") { key, status, assignee { name } } }'

};

export const command = `echo '${JSON.stringify(query)}' | http --json :3000/graphql`;

const barStyle = {
    backgroundColor: 'rgba(20, 20, 20, 0.85)',
    color: '#a5a5a5',
    font: '15px Iosevka Nerd Font',
    fontWeight: '700',
    color: '#aaa',
    '-webkit-font-smoothing': 'antialiased'
}

function carouselItems(issues) {

    function print(issue) {
        return issue.key;
    }

    return (
        <div className="carousel-inner">
            {issues.length > 0 ? <div className='carousel-item active'>{print(issues[0])}</div> : <div></div>}
            {issues.slice(1, issues.length).map(i => <div className='carousel-item'>{print(i)}</div>)}
        </div>
    );
}

function jiraComponent(jira) {

    $('.carousel').carousel();

    const blocked = jira.filter(i => i.status === 'Blocked');
    const inProgress = jira.filter(i => i.status === 'In Progress');
    const codeReviewing = jira.filter(i => i.status === 'Code Reviewing');
    const qaReady = jira.filter(i => i.status === 'QA Ready');
    const qaInProgress = jira.filter(i => i.status === 'QA In Progress');
    const readyForProduction = jira.filter(i => i.status === 'Ready For Production');

    return [
            <div className="carousel slide p-1 border-right border-secondary" data-ride="carousel">
                {carouselItems(blocked)}
            </div>,
            <div className="carousel slide p-1 border-right border-secondary" data-ride="carousel">
                {carouselItems(inProgress)}
            </div>,
            <div className="carousel slide p-1 border-right border-secondary" data-ride="carousel">
                {carouselItems(codeReviewing)}
            </div>,
            <div className="carousel slide p-1 border-right border-secondary" data-ride="carousel">
                {carouselItems(qaReady)}
            </div>,
            <div className="carousel slide p-1 border-right border-secondary" data-ride="carousel" >
                {carouselItems(qaInProgress)}
            </div>,
            <div className="carousel slide p-1" data-ride="carousel">
                {carouselItems(readyForProduction)}
            </div>
    ];
}

function cryptoComponent(cryptos) {

    function print(crypto) {
        return `${crypto.market.symbol} ${crypto.market.price}`
    }

    return (
        <div className="carousel slide p-1 border-right border-secondary" data-ride="carousel">
            <div className="carousel-inner">
                {cryptos.length > 0 ? <div className='carousel-item active'>{print(cryptos[0])}</div> : <div></div>}
                {cryptos.slice(1, cryptos.length).map(c => <div className='carousel-item'>{print(c)}</div>)}
            </div>
        </div>
    );
}

export function render(props) {
    const parent = document.getElementById('notifications-jsx');
    parent.classList.add('col');

    const { jira, eth, btc } = JSON.parse(props.output).data;

    return (
        <div className="d-inline-flex justify-content-start">
            <div className='d-flex justify-content-start border-top border-secondary rounded-bottom' style={barStyle}>
                {jiraComponent(jira)}
            </div>
            <div className='ml-2 d-flex justify-content-start border-top border-secondary rounded-bottom' style={barStyle}>
                {cryptoComponent([eth, btc])}
            </div>
        </div>
    );

}
