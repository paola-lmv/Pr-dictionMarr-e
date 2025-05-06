function DateEnMiliSecondes(dateStr) {
    // Séparer la date et l'heure
    let [datePart, timePart] = dateStr.split(' ');
    // Séparer jour, mois, année
    let [jour, mois, annee] = datePart.split('/');
    // Séparer heure, minute, seconde
    let [heures, minutes, secondes] = timePart.split(':');
    // Créer un objet Date en utilisant les composants
    let dateObj = new Date(annee, mois - 1, jour, heures, minutes, secondes);
    // Retourner le nombre de milisecondes (date de ref : 1er janvier 1970 à 00:00:00 UTC.)
    return Math.floor(dateObj.getTime() );
    }
export default DateEnMiliSecondes;