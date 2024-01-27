//polje...
var podaci=[
    //prvi element = JSON oblik zapisa
    {
        "id":"0",
        "ime":"Josip",
        "prezime":"Mirković",
        "slika":"https://as2.ftcdn.net/v2/jpg/03/16/76/07/1000_F_316760793_VwaEcqW6A4D5A6Li9j4ArqY2i0KuSS5o.jpg" ,
        "email":"josip@mirkovic.hr"    
    },
 //drugi element
    {
        "id":"1",
        "ime":"Ivana",
        "prezime":"Mirković",
        "slika":"https://as2.ftcdn.net/v2/jpg/03/16/76/07/1000_F_316760793_VwaEcqW6A4D5A6Li9j4ArqY2i0KuSS5o.jpg" ,
        "email":"ivana@mirkovic.hr"    
    }
     //n elementa ..
];

//polje...
var narudzbe=[
    //prvi element = JSON oblik zapisa
    {
        "id":"0",
        "brNar":"100",
        "partner":"Đuro Đaković spec."
    },
    {
        "id":"1",
        "brNar":"400",
        "partner":"Drvna industrija Brod"
    }
     //n elementa ..
];
//polje...
var artikli=[
    //prvi element = JSON oblik zapisa
    {
        "id":"0",
        "brart":"100",
        "naziv":"cipela"
    },
    {
        "id":"1",
        "brart":"200",
        "naziv":"Čačakalica"
    }
     //n elementa ..
];

var pregledi = [
    "pregled-korisnika",
    "pregled-narudžbi",
    "pregled-artikala",
    "izmjena-korisnika",
    "izmjena-narudzbe",
    "izmjena-artikla"];

function aktivirajPregled(article_id){
    pregledi.forEach(element => { 
            if(element==article_id){
                //za predani id aktiviraj(prikaži) pripadni html tag article article
                document.getElementById(element).style.display="block";
            }else{
                //ostale html tagove article  -> deaktiviraj/sakrij
                document.getElementById(element).style.display="none";
            }
            
        } 
    );
}

function ispisDatumUCeliju(x){
    let parsiraniDatum= new Date(x);
    if( ! isNaN(parsiraniDatum)){      
      
        let d=parsiraniDatum.getDate();
        let m=parsiraniDatum.getMonth();
        m+=1;
        let y= parsiraniDatum.getFullYear()   ;  

        return "<td >"+d+"."+m+"."+y+"</td>";
    }else{
        return "<td ></td>";
    }
}
