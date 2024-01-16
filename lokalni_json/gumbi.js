let gumbPregledKorisnika = document.querySelector('[href="pregled-korisnika"]');
        gumbPregledKorisnika.addEventListener('click', function(e){
            e.preventDefault();
            osvjeziTablicuKorisnika();//ovim se regeneira sadržaj tablice korisnika
            
        });

        let gumbPregledNar = document.querySelector('[href="pregled-narudžbi"]');
        gumbPregledNar.addEventListener('click', function(e){
            e.preventDefault();
            document.getElementById("pregled-korisnika").style.display="none";
            document.getElementById("izmjena-korisnika").style.display="none";
            document.getElementById("pregled-narudžbi").style.display="block";
            document.getElementById("pregled-artikala").style.display="none";

        });
        let gumbPregledArt = document.querySelector('[href="pregled-artikala"]');
        gumbPregledArt.addEventListener('click', function(e){
            e.preventDefault();
            document.getElementById("pregled-korisnika").style.display="none";
            document.getElementById("izmjena-korisnika").style.display="none";
            document.getElementById("pregled-narudžbi").style.display="none";
            document.getElementById("pregled-artikala").style.display="block";

        });
        let gumbIzmjenaKorsnika = document.querySelector('[href="novi-korisnik"]');
        gumbIzmjenaKorsnika.addEventListener('click', function(e){
            e.preventDefault();
            document.getElementById("pregled-korisnika").style.display="none";
            document.getElementById("izmjena-korisnika").style.display="block";
            document.getElementById("pregled-narudžbi").style.display="none";
            document.getElementById("pregled-artikala").style.display="none";

            let naslov=document.querySelector('#izmjena-korisnika h2');
            naslov.innerHTML="Novi korisnik";
        });