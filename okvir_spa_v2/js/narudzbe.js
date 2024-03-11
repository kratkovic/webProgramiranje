function osvjeziTablicuNarudzbi(){ //kreiran 240118 - četvrtak
    var body=document.getElementById("tab_nar");
    //iniciljano postalvjanje prije foreach petlje
    let bufferZaIspis="";
    // foreach element iz polja podaci (napunjen u podaci.js skripti)
    narudzbe.forEach(element => { 
            bufferZaIspis += "<tr onclick=\"dohvatiDetaljeNar('"+element.id+"')\" >";
            bufferZaIspis += "<td></td>";
            bufferZaIspis += "<td>"+element.brNar+"</td>";
            bufferZaIspis += "<td>"+element.partner+"</td>";
            bufferZaIspis += "</tr>";
        } 
    );        
    //istakanje renedirane vrijednosti u body DOM element
    body.innerHTML=bufferZaIspis;
    //aktiviram željeni dio stranice (html dokumenta)
    aktivirajPregled("pregled-narudžbi");
}

function dohvatiDetaljeNar(x){
    //tražim element iz polja koji ima id jednak vrijednosti parametra x
    //ctrl + d selekitra idući istoimeni tekst
    for(let i=0;i<narudzbe.length; i++){
        if(narudzbe[i].id==x){
            //kada nađemo element moramo napuniti formu
            document.getElementById("brNar").value = narudzbe[i].brNar;
            document.getElementById("partner").value = narudzbe[i].partner;
            odabraniID = x;//zapamti koji id smo odabrali
            break;
        }
    }
    aktivirajPregled("izmjena-narudzbe");
    //Ako se prije primjenio naziv na novi korisnik, sada vraćam nazad na: izmjeni korisnika
    let naslov=document.querySelector('#izmjena-narudzbe h2');
    naslov.innerHTML="Izmjeni narudžbe";
}

function spremiIzmjeneNarudzbe(){
    if(odabraniID==""){
        odabraniID=""+narudzbe.length;// polje 0,1,2 ima 3 elementa, pa znam da je 3 slobodna vrijednost za index
        let noviClan= {
            id:       odabraniID,
            brNar:    document.getElementById("brNar").value ,
            partner:  document.getElementById("partner").value ,
            //slika":"https://as2.ftcdn.net/v2/jpg/03/16/76/07/1000_F_316760793_VwaEcqW6A4D5A6Li9j4ArqY2i0KuSS5o.jpg" ,
            //email:  document.getElementById("email").value     
        };
        narudzbe.push(noviClan);
        odabraniID = "";
        document.getElementById("brNar").value ="";
        document.getElementById("partner").value ="";
    }
    else{
     //tražim element iz polja koji ima id jednak vrijednosti parametra x
        for(let i=0;i<narudzbe.length; i++){
            if(narudzbe[i].id==odabraniID){
                //kada nađemo element moramo napuniti formu
                narudzbe[i].brNar  = document.getElementById("brNar").value ;
                narudzbe[i].partner = document.getElementById("partner").value;
                odabraniID = "";
                document.getElementById("brNar").value ="";
                document.getElementById("partner").value ="";
                break;
            }
        }
    }
    osvjeziTablicuNarudzbi();
}
