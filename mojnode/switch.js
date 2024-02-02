let d = new Date();
Dan = d.getDay();
switch (Dan) {
    case 2 :
        console.log("Danas je Utorak!"); //ctrl + d višestruki zahvat označenog teksta
        
        break;
    case 5:
        console.log("Konačno petak");
        break;
    case 6:
        console.log("Savršena subota");
        break;
    case 0:
        console.log("Pospana nedjelja");
        break;
    default:
        console.log("Jedva čekam kraj tjedna!");

}