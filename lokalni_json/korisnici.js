function osvjeziTablicuKorisnika(){
    var body=document.getElementById("tab");
   
    let bufferZaIspis="";
    
    podaci.forEach(element => { 
            bufferZaIspis += "<tr onclick=\"dohvatiDetaljeKor('"+element.id+"')\" >";
            bufferZaIspis += "<td>";
                bufferZaIspis += "<img src=\"" 
                                +  element.slika 
                                + "\" alt=\"Korisnikova slika\">";
                                
            bufferZaIspis += "</td>";
            bufferZaIspis += "<td>"+element.ime+"</td>";
            bufferZaIspis += "<td>"+element.prezime+"</td>";
            bufferZaIspis += "<td>"+element.email+"</td>";
            bufferZaIspis += "</tr>";
        } 
    );        
    //istakanje renedirane vrijednosti u body DOM element
    body.innerHTML=bufferZaIspis;
    //aktiviram željeni dio stranice (html dokumenta)
    document.getElementById("pregled-korisnika").style.display="block";
    document.getElementById("izmjena-korisnika").style.display="none";
    document.getElementById("pregled-narudžbi").style.display="none";
    document.getElementById("pregled-artikala").style.display="none";
    document.getElementById("izmjena-narudzbe").style.display="none";
}

function dohvatiDetaljeKor(x){
    //tražim element iz polja koji ima id jednak vrijednosti parametra x
    for(let i=0;i<podaci.length; i++){
        if(podaci[i].id==x){
            //kada nađemo element moramo napuniti formu
            document.getElementById("ime").value = podaci[i].ime;
            document.getElementById("prezime").value = podaci[i].prezime;
            document.getElementById("email").value =podaci[i].email;
            odabraniID = x;//zapamti koji id smo odabrali
            break;
        }
    }
    document.getElementById("pregled-korisnika").style.display="none";
    document.getElementById("izmjena-korisnika").style.display="block";
    document.getElementById("pregled-narudžbi").style.display="none";
    document.getElementById("pregled-artikala").style.display="none";
    document.getElementById("izmjena-narudzbe").style.display="none";
    //Ako se prije primjenio naziv na novi korisnik, sada vraćam nazad na: izmjeni korisnika
    let naslov=document.querySelector('#izmjena-korisnika h2');
    naslov.innerHTML="Izmjeni korisnika";
}

function spremiIzmjeneKorisnika(){
    if(odabraniID==""){
        odabraniID=""+podaci.length;// polje 0,1,2 ima 3 elementa, pa znam da je 3 slobodna vrijednost za index
        let noviClan= {
            id:     odabraniID,
            ime:    document.getElementById("ime").value ,
            prezime:document.getElementById("prezime").value ,
            //slika":"https://as2.ftcdn.net/v2/jpg/03/16/76/07/1000_F_316760793_VwaEcqW6A4D5A6Li9j4ArqY2i0KuSS5o.jpg" ,
            email:  document.getElementById("email").value     
        };
        podaci.push(noviClan);
        odabraniID = "";
        document.getElementById("ime").value ="";
        document.getElementById("prezime").value ="";
        document.getElementById("email").value ="";
    }
    else{
     //tražim element iz polja koji ima id jednak vrijednosti parametra x
        for(let i=0;i<podaci.length; i++){
            if(podaci[i].id==odabraniID){
                //kada nađemo element moramo napuniti formu
                podaci[i].ime  = document.getElementById("ime").value ;
                podaci[i].prezime = document.getElementById("prezime").value;
                podaci[i].email = document.getElementById("email").value;
                odabraniID = "";
                document.getElementById("ime").value ="";
                document.getElementById("prezime").value ="";
                document.getElementById("email").value ="";
                break;
            }
        }
    }
    osvjeziTablicuKorisnika();
}