sap.ui.define([
    "tutorial/products/controller/BaseController",
    "sap/m/MessageToast"
  ], function (Controller, MessageToast) {
    "use strict";
  

  
    return Controller.extend("tutorial.products.controller.ProductDetail", {
  
      onInit: function () {
        const oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        oRouter.getRoute("ProductDetail").attachMatched(this._onRouteMatched, this);
      },
  
      _onRouteMatched: function (oEvent) {
        const iProductId = oEvent.getParameter("arguments").productId;
        const oView = this.getView();
        oView.bindElement({
          path: "/Products(" + iProductId + ")",
          parameters: {
            expand: "Supplier,Category"
          },
          events: {
            dataRequested: function () {
              oView.setBusy(true);
            },
            dataReceived: function () {
              oView.setBusy(false);
            }
          }
        });
      },
      addToCart: function () {
        MessageToast.show("Added to cart");
      },
      
      markAsFav: function (evt) {
        const oButton = evt.getSource();
        if (oButton.getIcon() === "sap-icon://unfavorite") {
          oButton.setIcon("sap-icon://favorite");
          MessageToast.show("Added to favorites");
          return;
        }
      
        oButton.setIcon("sap-icon://unfavorite");
        MessageToast.show("Removed from favorites");
      },      
  
    });
  });
  