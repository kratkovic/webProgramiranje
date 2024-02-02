class Osoba{
    constructor(xime, xprezime, x){
      this.ime=xime;
      this.prezime=xprezime;
      this.starost=x;
    }
  
     klasa="Osoba :";
     dajDetalje() {
      return this.klasa+ " "+ this.ime + " -  "+this.prezime + " - "+this.starost;
    }
  }
  
  const os1 = new Osoba('Tomislav','Lujić',28);//instance ili primjerak ili objekt klase Osoba
  console.error(os1.dajDetalje());
  
  let os2= new Osoba('Anita','Mijić',25);
  console.error(os2.dajDetalje());
  let os3= new Osoba('Anja','Gecan',25);
  
  class Polaznik extends Osoba{
      constructor(ime,prezime,starost, seminar){
          super(ime,prezime,starost);
          this.seminar=seminar;
      }
      klasa="Polaznik :";
      dajDetalje() {
          return this.klasa+ " "+ this.ime + " -  "+this.prezime + " - "+this.starost + " - "+this.seminar;
        }
  }
  
  let p1=new Polaznik('Marijan','Bošnjak',30,'Web programer');
  console.error(p1.dajDetalje());