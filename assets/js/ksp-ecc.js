function calculateEcTd(e, td){
    return e * td;
}

/**
 * T² = 4π²a³ / GM
 * Where: T - Time period for a full orbit
 * 4π² - just a constant, where π has its usual meaning
 * a - Semi-major axis of the orbit, defined as: a = (Rpe + Rap) / 2. (R being distance from the CENTRE of the primary body)
 * u - The standard gravitational parameter
 */
function calculateOp()
{
    const formData = new FormData($('#ksp-odc')[0]);
    const apo = parseInt(formData.get('apo'));
    const peri = parseInt(formData.get('peri'));
    const body = formData.get('body');

    const ra = apo + getBodyData(body, 'radius');
    const rp = peri + getBodyData(body, 'radius');
    
    const a = (ra + rp) / 2;
    const p = 4 * Math.pow(Math.PI, 2);
    const u = getBodyData(body, 'gm');

    const t2 = (p * Math.pow(a,3)) / u;
    
    return Math.sqrt(t2);
}

function calculateEcR(ecTd, Td) {
    /** 
     * To calculate Electric charge recovery
     * 1. Get maximum charge value from ectd
     * 2. Ectd / (Op (Orbital period) - Td (Total darkness))
    */
   const op = calculateOp();
   return Math.round(ecTd / (op - Td) * 1000) / 1000;
}

function hideEccResultsLabels(usePlaceholder)
{
    if (usePlaceholder) {
        $('#ecTd-result-label').val('');
        $('#ecTd-result-label').attr('placeholder', '...');
        $('#ecR-result-label').val('');
        $('#ecR-result-label').attr('placeholder', '...');
    }
    $('#ecTd-result').val('');
}

$('#ksp-ecc').on('submit', function(event){
    event.preventDefault();
    const Td = $('#td-in-seconds').val();
    // Electric charge consumption
    const ecc = $('#ecc').val();

    // No input values - exit early
    if (!Td || !ecc) {
        hideEccResultsLabels(true);
        return;
    }

    const ecTd = calculateEcTd(ecc, Td);
    const ecR = calculateEcR(ecTd, Td);

    $('#ecTd-result').val(ecTd);
    $('#ecTd-result-label').val(`${ecTd} ec`);

    $('#ecR-result')
    $('#ecR-result-label').val(`${ecR} /s`);
});