'use strict';

angular.module('rxInvoice', [
        'ngResource'
    ])


    .factory('Invoice', function ($resource, $http, $filter, i18nUtils) {
        var res = $resource('/api/invoices/:id', {'id': '@_id'}, {update: {method:'PUT'}, 'get':  {method:'GET', isArray:false}});
        var status = null;

        return  angular.extend(res,
            {
                findAll: function(callback) {
                    $http.get('/api/invoices')
                        .success(function(data) {
                            if (callback) {
                                callback(data);
                            }
                        });
                },

                getAllStatus: function(callback) {
                    if (!status) {
                        $http.get('/api/invoices/status')
                            .success(function(data) {
                                status = data;
                                if (callback) {
                                    callback(data);
                                }
                            });
                    } else if (callback) {
                        callback(status);
                    }
                },

                getAllKind: function() {
                   return ['SUBCONTRACTING', 'FEE', 'SERVICE', 'BUY_SELL', 'TRAINING'];
                },

                translateStatusLabel: function(status) {
                    return i18nUtils.translate('invoice.status.' + status);
                },

                translateKindLabel: function(kind) {
                    if(!kind){
                        return null;
                    }
                    return i18nUtils.translate('invoice.kind.' + kind);
                },

                generatePdfFilename: function(invoice) {
                    var filename = "";
                    if (invoice) {
                        if (invoice.reference) {
                            filename = invoice.reference;
                        }
                        if (invoice.business && invoice.business.name) {
                            if (filename) {
                                filename += "_";
                            }
                            filename += invoice.business.name;
                        }
                        if (invoice.date) {
                            if (filename) {
                                filename += "_";
                            }
                            filename += $filter('date')(invoice.date, "yyyyMMdd");
                        }
                    }
                    if (!filename) {
                        filename = "print_invoice";
                    }
                    return filename + ".pdf";
                }
            });
    }
);
