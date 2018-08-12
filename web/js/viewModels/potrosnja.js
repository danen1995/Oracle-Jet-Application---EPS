/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your about ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojchart', 'ojs/ojknockout', 'ojs/ojtable', 'ojs/ojarraytabledatasource', 'ojs/ojmodel', 'ojs/ojchart'],
        function (oj, ko, $) {
            function PotrosnjaViewModel() {
                var self = this;
                var rootViewModel = ko.dataFor(document.getElementById('mainContent'));
                self.ukupanIznos = ko.observable();
                self.potrosnja = ko.observableArray();
                self.idIzabranogRacuna = ko.observable("");
                self.labelaPeriod = ko.observable("Izaberite račun na kartici Računi");
                self.zelena = ko.observable(0);
                self.plava = ko.observable(0);
                self.crvena = ko.observable();
                self.visaTarifa = ko.observable(0);
                self.nizaTarifa = ko.observable(0);
                self.pieZoneSeriesValue = ko.observableArray();
                self.pieTarifeSeriesValue = ko.observableArray();
                self.threeDValue = ko.observable('off');
                self.listaPotrosnje = new oj.ArrayTableDataSource(
                        self.potrosnja,
                        {idAttribute: 'naziv'}
                );

                self.ucitajTabeluIPite = function () {
                    var rootViewModel = ko.dataFor(document.getElementById('mainContent'));
                    self.idIzabranogRacuna(rootViewModel.idIzabranogRacuna());
                    self.potrosnja.removeAll();
                    self.napuniTabelu();
                    self.postaviLabelu();
                    self.ucitajPodatkeZaPituZone();
                    self.ucitajPodatkeZaPituTarife();
                };

                self.napuniTabelu = function () {
                    $.getJSON("http://localhost:8082/vratiSveStavkeRacuna?idRacuna=" + self.idIzabranogRacuna()).
                            then(function (movies) {
                                $.each(movies, function () {
                                    self.potrosnja.push({
                                        naziv: this.idTipa.naziv,
                                        iznos: this.iznos + " dinara"
                                    });
                                });
                            });
                };

                self.postaviLabelu = function () {
                    $.getJSON("http://localhost:8082/vratiRacun?idRacuna=" + self.idIzabranogRacuna(), function (result) {
                        self.labelaPeriod(result.idOp.mesec + " " + result.idOp.godina);
                    });
                };

                self.ucitajPodatkeZaPituZone = function () {
                    $.getJSON("http://localhost:8082/vratiPotrosnjuZaZonu?idRacuna=" + self.idIzabranogRacuna() + "&zona=Zelena", function (result) {
                        self.zelena = result;
                    }).then(function () {
                        $.getJSON("http://localhost:8082/vratiPotrosnjuZaZonu?idRacuna=" + self.idIzabranogRacuna() + "&zona=Plava", function (result) {
                            self.plava = result;
                        }).then(function () {
                            $.getJSON("http://localhost:8082/vratiPotrosnjuZaZonu?idRacuna=" + self.idIzabranogRacuna() + "&zona=Crvena", function (result) {
                                self.crvena = result;
                            }).fail(function (jqXHR, status, error) {
                                self.crvena = 0;
                                self.prikaziPituZone();
                            }).then(function () {
                                self.prikaziPituZone();
                            });
                        });

                    });
                };
                self.ucitajPodatkeZaPituTarife = function () {
                    $.getJSON("http://localhost:8082/vratiPotrosnjuZaTarifu?idRacuna=" + self.idIzabranogRacuna() + "&tarifa=Visa tarifa", function (result) {
                        self.visaTarifa = result;
                    }).then(function () {
                        $.getJSON("http://localhost:8082/vratiPotrosnjuZaTarifu?idRacuna=" + self.idIzabranogRacuna() + "&tarifa=Niza tarifa", function (result) {
                            self.nizaTarifa = result;
                        }).then(function () {
                            self.prikaziPituTarife();
                        });
                    });

                };
                self.prikaziPituZone = function () {
                    var pieSeries = [
                        {name: "Plava", items: [self.plava]},
                        {name: "Zelena", items: [self.zelena]},
                        {name: "Crvena", items: [self.crvena]}
                    ];
                    self.pieZoneSeriesValue(pieSeries);
                };
                self.prikaziPituTarife = function () {
                    var pieSeries = [
                        {name: "Viša tarifa", items: [self.visaTarifa]},
                        {name: "Niža tarifa", items: [self.nizaTarifa]}
                    ];
                    self.pieTarifeSeriesValue(pieSeries);
                };
                self.prikaziSve = function () {

                };
            }
            return new PotrosnjaViewModel();

        }
);
