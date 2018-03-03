export const refreshFrequency = false;

let loaded = false;

export function render() {
    let ret = <div></div>;

    /* document.body.classList.add('container-fluid');*/

    const uberEl = document.getElementById('__uebersicht');
    /* uberEl.classList.add('row');*/

    if (!loaded) {

        ret =
            <div>

                <link href="" rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" />
                <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
                <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>

                <script src="https://momentjs.com/downloads/moment-with-locales.js"></script>

                <link href="" rel="stylesheet" href="./assets/colors.css" />
                <link href="" rel="stylesheet" href="./assets/fontawesome-all.min.css" />

            </div>;

        loaded = true;
    }

    return ret;
}
