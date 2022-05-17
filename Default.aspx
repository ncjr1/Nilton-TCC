<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="Nilton_TCC.Default" %>
<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">
    <script src="Pages/js/Default.js"></script>
    <link rel="stylesheet" href="Pages/css/Default.css"/>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.13/js/select2.min.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.13/css/select2.min.css" />
    <script src="https://kit.fontawesome.com/17341450f5.js" crossorigin="anonymous"></script>
    <script src="Plugins/notify.min.js" crossorigin="anonymous"></script>
    <script src="Scripts/moment.js"></script>
    <div class="main">
        <h1>Informativo</h1>
        <div class="row" style="margin-bottom: 10%;">
            <div class="col-4">
                <%--<select id="ddlLab" class="js-select2"></select>--%>
                <%--<input type="number" id="txtDoses"/>
                <button id="btnAdd" class="btn btn-success">Confirmar</button>--%>
            </div>
        </div>
        <div class="row" id="cardList"></div>
        <h3 id="intervalo"></h3>
        <div id="labInfo"></div>
        <h3 id="vacTitle" hidden>Tecnologias</h3>
        <div id="vaccineTech"></div>
    </div>
</asp:Content>
