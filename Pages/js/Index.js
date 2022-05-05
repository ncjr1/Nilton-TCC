class Index {
    constructor(){
        this.Iniciar();
        this.Eventos();
    }

    Iniciar(){
        this.LabsSelecionados = new Set();
        this.Labs = [ {"id" : "1", "nome" : "AstraZeneca"}, 
                      {"id" : "2", "nome" : "CoronaVac"}, 
                      {"id" : "3", "nome" : "Pfizer"}, 
                      {"id" : "4", "nome" : "Sputnik"},
                      {"id" : "5", "nome" : "Janssen"},
                      ]  
        $(".js-select2").select2();
        $("#cardList").append(`
            <div class="col-3">
                <div class="card">
                    <h4 class="card-title">${att.numDoses}ª Dose</h1>
                    <div class="card-body">
                        <div class="form-group">
                            <label>Laboratório</label>
                            <select id="ddlLab${att.numDoses}" class="form-control">
                                <option value="">Selecione</option>
                                ${this.Labs.map(x => `
                                    <option value="${x.nome}">${x.nome}</option>
                                `)}
                            </select>
                            <div class="invalid-feedback animated fadeInDown text-danger"></div>
                        </div>
                        <div class="form-group">
                            <label>Data da Vacinação</label>
                            <input type="date" class="dataInput form-control" id="txtData${att.numDoses}"/>
                            <div class="invalid-feedback animated fadeInDown text-danger"></div>
                        </div>
                    </div>
                    <div class="card-footer">
                        <button class="btnOutroCard"><i class="fas fa-plus"></i> Dose</button>
                    </div>
                </div>
            </div>
        `);

    }
    Eventos(){
        $("body").on("click", ".btnOutroCard", (e) => {
            e.preventDefault();
            if(!this.Validar()) return;
            let Labs = this.Labs;
            att.primeiro ? att.numDoses++ : "";
            if(att.numDoses > 3){
                console.log("teste");
            }else{
                if(att.numDoses == 3){
                    Labs.splice(4);
                    $("#cardList").append(`
                    <div class="col-3" id="${att.numDoses}">
                        <div class="card">
                            <h4 class="card-title">${att.numDoses}ª Dose</h1>
                            <div class="card-body">
                                <div class="form-group">
                                    <label>Laboratório</label>
                                    <select id="ddlLab${att.numDoses}" class="form-control">
                                        <option value="">Selecione</option>
                                        ${Labs.map(x => `
                                            <option value="${x.nome}">${x.nome}</option>
                                        `)}
                                    </select>
                                    <div class="invalid-feedback animated fadeInDown text-danger"></div>
                                </div>
                                <div class="form-group">
                                    <label>Data da Vacinação</label>
                                    <input type="date" class="dataInput form-control" id="txtData${att.numDoses}"/>
                                    <div class="invalid-feedback animated fadeInDown text-danger"></div>
                                </div>
                            </div>
                            <div class="card-footer">
                                <button class="btnOutroCard"><i class="fas fa-plus"></i> Dose</button>
                            </div>
                        </div>
                    </div>
                    `);
                }else{
                    $(`#ddlLab${att.numDoses - 1}`).val() == "Janssen" ? "" :
                    $("#cardList").append(`
                    <div class="col-3" id="${att.numDoses}">
                        <div class="card">
                            <h4 class="card-title">${att.numDoses}ª Dose</h1>
                            <div class="card-body">
                                <div class="form-group">
                                    <label>Laboratório</label>
                                    <select id="ddlLab${att.numDoses}" class="form-control">
                                        <option value="">Selecione</option>
                                        ${Labs.filter(x => $(`#ddlLab${att.numDoses - 1}`).val() == x.nome).map(x => `
                                            <option value="${x.nome}">${x.nome}</option>
                                        `)}
                                    </select>
                                    <div class="invalid-feedback animated fadeInDown text-danger"></div>
                                </div>
                                <div class="form-group">
                                    <label>Data da Vacinação</label>
                                    <input type="date" class="dataInput form-control" id="txtData${att.numDoses}"/>
                                    <div class="invalid-feedback animated fadeInDown text-danger"></div>
                                </div>
                            </div>
                            <div class="card-footer">
                                <button class="btnOutroCard"><i class="fas fa-plus"></i> Dose</button>
                            </div>
                        </div>
                    </div>
                    `);
                }
                switch ($(`#ddlLab${att.numDoses - 1}`).val()) {
                    case "AstraZeneca":
                        this.LabsSelecionados.add("AstraZeneca");
                        break;
                        
                    case "CoronaVac":
                        this.LabsSelecionados.add("CoronaVac");
                        break;
                        
                    case "Pfizer":
                        this.LabsSelecionados.add("Pfizer");
                        break;
                        
                    case "Janssen":
                        this.LabsSelecionados.add("Jansen");
                        break;
                    
                    case "Sputnik":
                        this.LabsSelecionados.add("Sputnik");
                        break;
                        
                    default:
                        console.log("Ocorreu um erro!");
                        break;
                }
                        
                if(this.LabsSelecionados.size != att.setCount){
                    this.AddLabCard($(`#ddlLab${att.numDoses - 1}`).val());
                    this.AddTechnology($(`#ddlLab${att.numDoses - 1}`).val());
                    att.setCount = this.LabsSelecionados.size;
                }
    
                $(e.currentTarget).prop("disabled", true);
                $(`#ddlLab${att.numDoses - 1}`).prop("disabled", true);
                $(`#txtData${att.numDoses - 1}`).prop("disabled", true);
                this.SetIntervalo($(`#ddlLab${att.numDoses - 1}`).val(), moment($(`#txtData${att.numDoses - 1}`).val())._i);
                att.primeiro ? "" : att.numDoses++;
            }
        });   
    }
    Validar(){
        let ok = true;
        let msg = "";
        const VerificarCampo = function (teste, mensagem, seletor) {
            if (teste) {
                ok = false;
                msg += "" + mensagem + "\n";
                $(seletor).addClass("is-invalid").siblings(".invalid-feedback").text(mensagem).focus();
            } else {
                $(seletor).removeClass("is-invalid").siblings(".invalid-feedback").text("");
            }
            return teste;
        }

        VerificarCampo($(`#ddlLab${att.numDoses}`).val() == "", "O Campo Laboratório é obrigatório", `#ddlLab${att.numDoses}`);
        VerificarCampo($(`#txtData${att.numDoses}`).val() == "", "O Campo Data de Vacinação é obrigatório", `#txtData${att.numDoses}`);

        if(att.numDoses > 1){
            VerificarCampo(moment($(`#txtData${att.numDoses}`).val()).isBefore(att.dataDoseAnterior.split("/").reverse().join("-"), "day") , `A ${att.numDoses}ª Dose deve ser tomada depois de ${att.dataDoseAnterior}`, `#txtData${att.numDoses}`);
        }

        if(!ok){
            this.ErrorMessage(msg);
        }

        return ok;
    }
    ErrorMessage(texto) {
        var background;
        background = "warning";
        $.notify(texto, { z_index: 2000, type: background });
    }
    AddLabCard(labName){
        $("#labInfo").append(`
            <div class="labInfoCard" id="${labName}">
                <div class="lab-card-title">
                    <img class="flag" src="./images/${labName}.svg"/>
                    <div>${labName}</div>
                </div>
                <div class="lab-card-body">
                    ${this.AddLabCardDescription(labName)}
                </div>
            </div>
        `);
    }
    AddLabCardDescription(labName){
        let description = "";
        switch (labName) {
            case "AstraZeneca":
                description = "Teste Descricao " + labName;
                break;
                    
            case "CoronaVac":
                description = "Teste Descricao " + labName;
                break;
                
            case "Pfizer":
                description = "Teste Descricao " + labName;
                break;
                
            case "Janssen":
                description = "Teste Descricao " + labName;
                break;
            
            case "Sputnik":
                description = "Teste Descricao " + labName;
                break;
                
            default:
                console.log("Ocorreu um erro! -labDescription- ");
                break;
        }

        return description;
    }
    AddTechnology(labName){
        switch (labName) {
            case "AstraZeneca":
                $("#vaccineTech").append(`
                    <div class="vaccineTechCard" id="Tech${labName}">
                        <div class="vaccineTech-card-title">
                            <div>Vetor Adenovírus Recombinante</div>
                        </div>
                        <div class="vaccineTech-card-body">
                            
                        </div>
                    </div>
                `);
                break;
                    
            case "CoronaVac":
                $("#vaccineTech").append(`
                    <div class="vaccineTechCard" id="Tech${labName}">
                        <div class="vaccineTech-card-title">
                            <div>Antígeno do Vírus Inativado </div>
                        </div>
                        <div class="vaccineTech-card-body">

                        </div>
                    </div>
                `);
                break;
                
            case "Pfizer":
                $("#vaccineTech").append(`
                    <div class="vaccineTechCard" id="Tech${labName}">
                        <div class="vaccineTech-card-title">
                            <div>RNA Mensageiro Sintético </div>
                        </div>
                        <div class="vaccineTech-card-body">

                        </div>
                    </div>
                `);
                break;
                
            case "Janssen":
                $("#vaccineTech").append(`
                    <div class="vaccineTechCard" id="Tech${labName}">
                        <div class="vaccineTech-card-title">
                            <div>Vetores de Adenovírus Sorotipo 26</div>
                        </div>
                        <div class="vaccineTech-card-body">

                        </div>
                    </div>
                `);
                break;
            
            case "Sputnik":
                $("#vaccineTech").append(`
                    <div class="vaccineTechCard" id="Tech${labName}">
                        <div class="vaccineTech-card-title">
                            <div>Adenovírus D-26 D-5</div>
                        </div>
                        <div class="vaccineTech-card-body">

                        </div>
                    </div>
                `);
                break;
                
            default:
                console.log("Ocorreu um erro! -Tech- ");
                break;
        }
    }
    SetIntervalo(labName, data){
        switch (labName) {
            case "AstraZeneca":
                $("#intervalo").html(`A próxima dose deverá ser tomada a partir do dia ${this.CalculaTempo(labName, data)}!`);
                break;
                    
            case "CoronaVac":
                $("#intervalo").html(`A próxima dose deverá ser tomada a partir do dia ${this.CalculaTempo(labName, data)}!`);
                break;
                
            case "Pfizer":
                $("#intervalo").html(`A próxima dose deverá ser tomada a partir do dia ${this.CalculaTempo(labName, data)}!`);
                break;
                
            case "Janssen":
                $("#intervalo").html(`A Vacina Janssen é de Dose única, você já está Imunizado(a)!`);
                break;
            
            case "Sputnik":
                $("#intervalo").html(`A próxima dose deverá ser tomada a partir do dia ${this.CalculaTempo(labName, data)}!`);
                break;
                
            default:
                console.log("Ocorreu um erro!");
                break;
        }
    }
    CalculaTempo(labName, dataInformada){
        let date ="";
        switch (labName) {
            case "AstraZeneca":
                date = moment(dataInformada).add(30, `days`).calendar();
                break;
                    
            case "CoronaVac":
                date = moment(dataInformada).add(14, `days`).calendar();
                break;
                
            case "Pfizer":
                date = moment(dataInformada).add(21, `days`).calendar();
                break;
            
            case "Sputnik":
                date = moment(dataInformada).add(21, `days`).calendar();
                break;
                
            default:
                console.log("Ocorreu um erro!");
                break;
        }
        att.dataDoseAnterior = this.FormatarData(date);
        console.log(att.dataDoseAnterior);
        return this.FormatarData(date);
    }
    FormatarData(data){
        if(data != undefined || data != ""){
            let arrData =  data.split("/");
            return arrData[1] + "/" + arrData[0] + "/" + arrData[2];
        } 
    }
}

var att = {
    cards : [],
    numDoses : 1,
    primeiro : true,
    setCount : 0,
    dataDoseAnterior : new Date()
}

$(document).ready(() => {
    app = new Index();
});