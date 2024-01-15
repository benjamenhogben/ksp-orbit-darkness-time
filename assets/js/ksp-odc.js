function calculateTd(a, b, h, R, e)
{
    return ((2*a*b)/h) * (Math.asin(R/b) + (e*R/b));
}

function getBodyData(body, data)
{
    switch(body) {
        case 'kerbin':
            switch (data) {
                case 'radius':
                    return 600000;
                case 'mass':
                    return 5.2915158e22;
                case 'gm':
                    return 3.5316000e12;
            }
          break;
        case 'mun':
            switch (data) {
                case 'radius':
                    return 200000;
                case 'mass':
                    return 9.7599066e20;
                case 'gm':
                    return 6.5138398e10;
            }
          break;
          case 'minmus':
            switch (data) {
                case 'radius':
                    return 60000;
                case 'mass':
                    return 2.6457580e19;
                case 'gm':
                    return 1.7658000e9;
            }
          break;
          case 'moho':
            switch (data) {
                case 'radius':
                    return 250000;
                case 'mass':
                    return 2.5263314e21;
                case 'gm':
                    return 1.6860938e11;
            }
          break;
          case 'eve':
            switch (data) {
                case 'radius':
                    return 700000;
                case 'mass':
                    return 1.2243980e23;
                case 'gm':
                    return 8.1717302e12;
            }
          break;
          case 'gilly':
            switch (data) {
                case 'radius':
                    return 13000;
                case 'mass':
                    return 1.2420363e17;
                case 'gm':
                    return 8289449.8;
            }
          break;
          case 'duna':
            switch (data) {
                case 'radius':
                    return 320000;
                case 'mass':
                    return 4.5154270e21;
                case 'gm':
                    return 3.0136321e11;
            }
          break;
          case 'ike':
            switch (data) {
                case 'radius':
                    return 130000;
                case 'mass':
                    return 2.7821615e20;
                case 'gm':
                    return 1.8568369e10;
            }
          break;
          case 'dres':
            switch (data) {
                case 'radius':
                    return 138000;
                case 'mass':
                    return 3.2190937e20;
                case 'gm':
                    return 2.1484489e10;
            }
          break;
          case 'jool':
            switch (data) {
                case 'radius':
                    return 6000000;
                case 'mass':
                    return 4.2332127e24;
                case 'gm':
                    return 2.8252800e14;
            }
          break;
          case 'laythe':
            switch (data) {
                case 'radius':
                    return 500000;
                case 'mass':
                    return 2.9397311e22;
                case 'gm':
                    return 1.9620000e12;
            }
          break;
          case 'vall':
            switch (data) {
                case 'radius':
                    return 300000;
                case 'mass':
                    return 3.1087655e21;
                case 'gm':
                    return 2.0748150e11;
            }
          break;
          case 'tylo':
            switch (data) {
                case 'radius':
                    return 600000;
                case 'mass':
                    return 4.2332127e22;
                case 'gm':
                    return 2.8252800e12;
            }
          break;
          case 'bop':
            switch (data) {
                case 'radius':
                    return 65000;
                case 'mass':
                    return 3.7261090e19;
                case 'gm':
                    return 2.4868349e9;
            }
          break;
          case 'pol':
            switch (data) {
                case 'radius':
                    return 44000;
                case 'mass':
                    return 1.0813507e19;
                case 'gm':
                    return 7.2170208e8;
            }
          break;
          case 'eeloo':
            switch (data) {
                case 'radius':
                    return 210000;
                case 'mass':
                    return 1.1149224e21;
                case 'gm':
                    return 7.4410815e10;
            }
          break;
        default:
          return null;
      }
}

function hideResultsLabels(usePlaceholder)
{
    if (usePlaceholder) {
        $('#td-in-seconds-label')
            .val('')
            .attr('placeholder', '...');
    }
    $('#td-in-minutes-label').hide();
    $('#td-in-hours-label').hide();

    // Also reset values
    $('#td-in-seconds').val('');
    $('#td-in-minutes').val('');
    $('#td-in-hours').val('');
}

$('#ksp-odc').on('submit', function(event){
    event.preventDefault();
    const formData = new FormData(event.target);

    const apo = parseInt(formData.get('apo'));
    const peri = parseInt(formData.get('peri'));
    const body = formData.get('body');

    // no input values - exit early
    if (!apo || !peri || !body) {
        hideResultsLabels(true);
        return;
    }

    const ra = apo + getBodyData(body, 'radius');
    const rp = peri + getBodyData(body, 'radius');
    
    const a = (ra + rp) / 2;
    const b = Math.sqrt(ra * rp);
    const e = (ra-rp)/(ra+rp);
    const l = (2*ra*rp)/(ra+rp);
    const u = getBodyData(body, 'gm');
    const h = Math.sqrt(l * u);
    const R = getBodyData(body, 'radius');

    const tdInSeconds = calculateTd(a, b, h, R, e);
    
    const seconds = Math.floor(tdInSeconds);
    const minutes = Math.floor(tdInSeconds / 60);
    const hours = Math.floor(tdInSeconds / 3600);
    
    // Hide values by default - no placeholder
    hideResultsLabels(false);

    $('#td-in-seconds').val(seconds);
    $('#td-in-seconds-label').val(
        `${seconds} seconds`
    );

    $('#td-in-minutes').val(minutes);
    if (minutes > 1 || hours > 1) {
        $('#td-in-minutes-label')
            .show()
            .val(
                `${minutes} minutes and ${seconds - minutes * 60} seconds`
            );
    }
    
    $('#td-in-hours').val(hours);
    if (hours > 1) {
        $('#td-in-hours-label')
            .show()
            .val(
                hours > 1 ? `${hours} hours, ${minutes - hours * 3600} minutes, and  ${seconds - minutes * 60 - hours * 3600} seconds` : ''
            );
    }
});