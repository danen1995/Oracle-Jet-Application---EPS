/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your dashboard ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'ojs/ojmodel',
    'ojs/ojinputtext', 'ojs/ojbutton', 'ojs/ojtable'],
        function (oj, ko, $) {
            function RegBrViewModel() {
                var self = this;
                self.urlServisa = "http://localhost:8082/potrosacEdBr";
                self.edBroj = ko.observable("125963211553");
                self.brojBrojila = ko.observable(1258963);
                self.URLregistracija = ko.pureComputed(function () {
                    return self.urlServisa + "?brojBrojila=" + self.brojBrojila() + "&edBroj=" + self.edBroj();
                }
                );

                self.proveraBrojila = function () {
                    $.getJSON(self.URLregistracija(), function (result) {
                        self.jsonString = JSON.stringify(result);
                        console.log(self.jsonString);
                    }).fail(function (jqXHR, status, error) {
                        var x = document.getElementById("divError");
                        x.style.display = "block";
                    }).then(function () {
                        var potrosac = JSON.parse(self.jsonString);
                        self.URLKorisnik = "http://localhost:8082/daLiVecPostojiKorisnikZaEdBb?brojBrojila=" + self.brojBrojila() + "&edBroj=" + self.edBroj();
                        $.getJSON(self.URLKorisnik, function (result) {
                            self.jsonStringKorisnik = JSON.stringify(result);
                            console.log(self.jsonStringKorisnik);
                        }).fail(function (jqXHR, status, error) {
                            var y = document.getElementById("divSuccess");
                            y.style.display = "block";
                            //registracija
                            self.router = oj.Router.rootInstance;
 
                            var navData = [
//                                {name: 'Ulogujte se', id: 'login',
//                                    iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-chart-icon-24'},
                                {name: 'Registracija korisnika', id: 'registracijaKorisnika',
                                    iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-fire-icon-24'}
                            ];
                            var rootViewModel = ko.dataFor(document.getElementById('mainContent'));
                            rootViewModel.navDataSource.reset(navData, {idAttribute: 'id'});
                            self.URLKupac = "http://localhost:8082/vratiKupcaZaEdBb?edBroj=" + self.edBroj() + "&brojBrojila=" + self.brojBrojila();
                            $.getJSON(self.URLKupac, function (result) {
                                self.jsonStringKupac = JSON.stringify(result);
                                console.log(self.jsonStringKupac);
                            }).fail(function (jqXHR, status, error) {
                                alert("Proverite konekciju!");
                            }).then(function () {
                                var kupac = JSON.parse(self.jsonStringKupac);
                                rootViewModel.kupacZaRegistraciju(kupac);
                                self.router.go('registracijaKorisnika');
                            });

                        }).then(function () {
                            var x = document.getElementById("vecPostojiKorisnik");
                            x.style.display = "block";
                        });
                    });
                }
            }
            return RegBrViewModel();
        }
);
