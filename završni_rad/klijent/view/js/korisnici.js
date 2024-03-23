function osvjeziTablicuKorisnika(){ //kreiran 240116 - utorak
    var body=document.getElementById("tab");
    //iniciljano postalvjanje prije foreach petlje
    let bufferZaIspis="";
    // foreach element iz polja korisnici (napunjen u korisnici.js skripti)
    korisnici.forEach(element => { 
            bufferZaIspis += "<tr onclick=\"dohvatiDetaljeKor('"+element.id+"')\" >";
            bufferZaIspis += "<td>";
                bufferZaIspis += "<img src=\"" 
                                +  element.slika 
                                + "\" alt=\"Korisnikova slika\">";
                                
            bufferZaIspis += "</td>";
            bufferZaIspis += "<td>"+element.ime+"</td>";
            bufferZaIspis += "<td>"+element.prezime+"</td>";
            bufferZaIspis += "<td>"+element.email+"</td>";
            bufferZaIspis += ispisDatumUCeliju(element.rodjendan) ;      
            bufferZaIspis += ispisDatumUCeliju(element.aktivacija) ;      
            bufferZaIspis += "</tr>";
        } 
    );        
    //istakanje renedirane vrijednosti u body DOM element
    body.innerHTML=bufferZaIspis;
    //aktiviram željeni dio stranice (html dokumenta)
    aktivirajPregled("pregled-korisnika");
}

function dohvatiDetaljeKor(x){
    //tražim element iz polja koji ima id jednak vrijednosti parametra x
    for(let i=0;i<korisnici.length; i++){
        if(korisnici[i].id==x){
            //kada nađemo element moramo napuniti formu
            document.getElementById("ime").value = korisnici[i].ime;
            document.getElementById("prezime").value = korisnici[i].prezime;
            document.getElementById("email").value =korisnici[i].email;
            document.getElementById("rodjendan").value =korisnici[i].rodjendan;
            document.getElementById("aktivacija").value =korisnici[i].aktivacija;
            odabraniID = x;//zapamti koji id smo odabrali
            break;
        }
    }
    aktivirajPregled("izmjena-korisnika");
    //Ako se prije primjenio naziv na novi korisnik, sada vraćam nazad na: izmjeni korisnika
    let naslov=document.querySelector('#izmjena-korisnika h2');
    naslov.innerHTML="Izmjeni korisnika";
}

function spremiIzmjeneKorisnika(){
    if(odabraniID==""){
        odabraniID=""+korisnici.length;// polje 0,1,2 ima 3 elementa, pa znam da je 3 slobodna vrijednost za index
        let noviClan= {
            id:     odabraniID,
            ime:    document.getElementById("ime").value ,
            prezime:document.getElementById("prezime").value ,
            //slika":"https://as2.ftcdn.net/v2/jpg/03/16/76/07/1000_F_316760793_VwaEcqW6A4D5A6Li9j4ArqY2i0KuSS5o.jpg" ,
            email:  document.getElementById("email").value ,    
            rodjendan:  document.getElementById("rodjendan").value ,    
            aktivacija:  document.getElementById("aktivacija").value     
        };
        korisnici.push(noviClan);
        odabraniID = "";
        document.getElementById("ime").value ="";
        document.getElementById("prezime").value ="";
        document.getElementById("email").value ="";
        document.getElementById("rodjendan").value ="";
        document.getElementById("aktivacija").value ="";
    }
    else{
     //tražim element iz polja koji ima id jednak vrijednosti parametra x
        for(let i=0;i<korisnici.length; i++){
            if(korisnici[i].id==odabraniID){
                //kada nađemo element moramo napuniti formu
                korisnici[i].ime  = document.getElementById("ime").value ;
                korisnici[i].prezime = document.getElementById("prezime").value;
                korisnici[i].email = document.getElementById("email").value;
                korisnici[i].rodjendan = document.getElementById("rodjendan").value;
                korisnici[i].aktivacija = document.getElementById("aktivacija").value;
                odabraniID = "";
                document.getElementById("ime").value ="";
                document.getElementById("prezime").value ="";
                document.getElementById("email").value ="";
                document.getElementById("rodjendan").value ="";
                document.getElementById("aktivacija").value ="";
                break;
            }
        }
    }
    osvjeziTablicuKorisnika();
}
