/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your customer ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'ojs/ojTable', 'ojs/ojinputtext', 'ojs/ojarraytabledatasource'],
        function (oj, ko, $) {
            function CustomerViewModel() {
                var self = this;
                self.idKupca = ko.observable("");
                self.jmbg = ko.observable("");
                self.maticniBroj = ko.observable("");
                self.naplatniBroj = ko.observable("");
                self.naziv = ko.observable("");
                self.pib = ko.observable("");
                self.prosireniNaziv = ko.observable("");
                self.tip = ko.observable("");
                self.grad = ko.observable("");
                self.ulica = ko.observable("");
                self.grad = ko.observable("");
                self.opstina = ko.observable("");
                self.korisnik = ko.observable();
                console.log("Sad cu da udjem u fju");
                var rootViewModel = ko.dataFor(document.getElementById('mainContent'));
                self.idUlogovanog = rootViewModel.userID();
                console.log('ID ulogovanog korisnika je ' + self.idUlogovanog);
                self.osnovniPodaciURL = ko.pureComputed(function () {
                    return "http://localhost:8082/osnovniPodaci?korID=" + self.idUlogovanog;
                }
                );
                console.log(self.osnovniPodaciURL());
                self.data = ko.observableArray();
                $.getJSON(self.osnovniPodaciURL(), function (result) {
                    var kupac = result;
                    self.jmbg(kupac.jmbg);
                    self.idKupca(kupac.idKupca);
                    rootViewModel.idUlogovanogKupca(self.idKupca());
                    self.maticniBroj(kupac.maticniBroj);
                    self.naplatniBroj(kupac.naplatniBroj);
                    self.naziv(kupac.naziv);
                    self.pib(kupac.pib);
                    self.prosireniNaziv(kupac.prosireniNaziv);
                    self.tip(kupac.tip);
                    self.grad(kupac.idAdreseSr.grad);
                    self.ulica(kupac.idAdreseSr.ulica);
                    self.opstina(kupac.idAdreseSr.opstina);
                });
              
            }
            ;
            return new CustomerViewModel();
        }
);