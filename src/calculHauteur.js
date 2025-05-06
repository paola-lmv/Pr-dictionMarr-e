import coeffs from './coeffs.json'

function CalculHauteur(date){
    let Z0=coeffs.find(c => c.coefficientName === "Z0").value;
    let h = Z0;
    coeffs.slice(1).forEach(coeff => { // on ignore ZO
        h+=coeff.f*coeff.A*Math.cos((coeff.w*date/3600000+coeff.vo-coeff.g)*(Math.PI / 180))
    });
    return h 
}
export default CalculHauteur;