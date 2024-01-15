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
        default:
          return null;
      }
}

$('#ksp-odc').on('submit', function(event){
    event.preventDefault();
    const formData = new FormData(event.target);
    const apo = parseInt(formData.get('apo'));
    const peri = parseInt(formData.get('peri'));
    const body = formData.get('body');

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

    $('#result-in-seconds').text(
        `${seconds} seconds`
    );
    $('#result-in-minutes').text(
        minutes > 1 ? `${minutes} minutes and ${seconds - minutes * 60} seconds` : ''
    );
    $('#result-in-hours').text(
        hours > 1 ? `${hours} hours, ${minutes - hours * 3600} minutes, and  ${seconds - minutes * 60 - hours * 3600} seconds` : ''
    );
});