class Index {
    constructor(){
        this.Iniciar();
        this.Eventos();
    }

    Iniciar(){
        this.LabsSelecionados = new Set();
        this.Labs = [ {"nome" : "AstraZeneca"}, 
                      {"nome" : "CoronaVac"}, 
                      {"nome" : "Pfizer"},
                      {"nome" : "Janssen"}]  
        $(".js-select2").select2();
        this.MontarCard(this.Labs, true);
    }
    Eventos(){
        $("body").on("click", ".btnOutroCard", (e) => {
            e.preventDefault();
            if(!this.Validar()) return;
            let Labs = this.Labs;
            att.numDoses++;
            if(att.numDoses > 2){
                $(e.currentTarget).prop("disabled", true);
                $("#intervalo").html(`Parabéns, você já está Imunizado(a)!`);
            }else{
                Labs.splice(3);
                $(`#ddlLab${att.numDoses - 1}`).val() != "Janssen" ? this.MontarCard(Labs, false) : "";
                this.SetIntervalo($(`#ddlLab${att.numDoses - 1}`).val(), moment($(`#txtData${att.numDoses - 1}`).val())._i);
            }
            this.AddSet($(`#ddlLab${att.numDoses - 1}`).val());
            $(e.currentTarget).prop("disabled", true);
            $(`#ddlLab${att.numDoses - 1}`).prop("disabled", true);
            $(`#txtData${att.numDoses - 1}`).prop("disabled", true);
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
                return `<ul>
                            <li>A vacina advêm da biofarmacêutica AstraZeneca em parceria com a universidade de Oxford. A biofarmacêutica foi fundada em 1999 por meio da fusão do laboratório sueco Astra AB e da empresa farmacêutica britânica Zeneca Group, que desde o início executou investimentos P&D (Pesquisa e Desenvolvimento), que visam a otimização aos esforços de seus colaboradores na busca por resultados. A vacina da AstraZeneca utiliza a tecnologia Vetor Adenovírus Recombinante.</li>
                            <li>Segundo a bula, a faixa etária autorizada é a partir de 18 anos e com um intervalo de 4 a 12 semanas entre as doses.</li>
                            <li><a target="_blank" rel="noopener noreferrer" href="https://www.bio.fiocruz.br/images/bula-vacina-covid-19-recombinante-vp-002-27-01-2021.pdf">Acesse a Bula</a></li>    
                        </ul>`;
                break;
                    
            case "CoronaVac":
                return `<ul>
                            <li>Envasada no Brasil pelo Instituto Butantan, em parceria com a fabricante chinesa de medicamentos Sinovac Biotech. O Instituto Butantan é o maior produtor de vacinas e soros da América Latina e o principal produtor de imunobiológicos do Brasil. A CoronaVac utiliza a tecnologia Antígeno do Vírus Inativado.</li>
                            <li>Segundo a bula, a faixa etária autorizada é a partir de 6 anos e com um intervalo de 4 semanas entre as doses.</li>
                            <li><a target="_blank" rel="noopener noreferrer" href="https://www.gov.br/anvisa/pt-br/assuntos/medicamentos/bulas-e-rotulos/bulas-uso-emergencial/vacinas/bula-coronavac-atualizada.pdf">Acesse a Bula</a></li>    
                        </ul>`;
                break;
                
            case "Pfizer":
                return `<ul>
                            <li>Empresa americana, fundada em 1849 no Brooklyn, NY, a Pfizer é uma das maiores empresas farmacêuticas do mundo, famosa por criar o Viagra. Trouxe como alternativa para a imunização contra o COVID-19 a vacina Comirnaty®, que utiliza a tecnologia RNA mensageiro sintético.</li>
                            <li>Segundo a bula, a faixa etária autorizada é a partir de 5 anos e com um intervalo de 21 dias entre as doses.</li>
                            <li><a target="_blank" rel="noopener noreferrer" href="https://www.pfizer.com.br/sites/default/files/inline-files/Comirnaty_Profissional_de_Saude_36.pdf">Acesse a Bula</a></li>    
                        </ul>`;
                break;
                
            case "Janssen":
                return `<ul>
                            <li>Inicialmente um laboratório de pesquisa, a Janssen foi fundada pelo Dr Paul Janssen em 1935 em Beerse, Bélgica. Em 1961, a Janssen foi adquirida pelo grupo Johnson & Johnson, integrando o braço farmacêutico da companhia. A vacina da Janssen contra o COVID-19 utiliza a tecnologia Vetores de Adenovírus Sorotipo 26</li>
                            <li>Segundo a bula, a faixa etária autorizada é a partir de 18 anos e de dose única.</li>
                            <li><a target="_blank" rel="noopener noreferrer" href="https://www.janssen.com/brasil/sites/www_janssen_com_brazil/files/prod_files/live/vacina_covid-19_recombinante_pub_vps.pdf">Acesse a Bula</a></li>    
                        </ul>`;
                break;
                
            default:
                console.log("Ocorreu um erro! -labDescription- ");
                break;
        }

        return description;
    }
    AddTechnology(labName){
        $("#vacTitle").prop("hidden", false);
        switch (labName) {
            case "AstraZeneca":
                $("#vaccineTech").append(`
                    <div class="vaccineTechCard" id="Tech${labName}">
                        <div class="vaccineTech-card-title">
                            <i class="fa-solid fa-virus-covid-slash"></i> <div> Vetor Adenovírus Recombinante - AstraZeneca</div>
                        </div>
                        <div class="vaccineTech-card-body">
                            Segundo a Bula da Vacina: </br>
                            " A vacina covid-19 (recombinante) é uma vacina monovalente composta por um único vetor adenovírus
                            recombinante de chimpanzé, deficiente para replicação (ChAdOx1), que expressa a glicoproteína S do SARSCoV-2. Após a administração, a glicoproteína S do SARS-CoV-2 é expressa localmente estimulando anticorpos
                            neutralizantes e resposta imune celular."
                            </br><a target="_blank" rel="noopener noreferrer" href="https://www.bio.fiocruz.br/images/bula-vacina-covid-19-recombinante-vp-002-27-01-2021.pdf">Acesse a Bula</a>
                        </div>
                    </div>
                `);
                break;
                    
            case "CoronaVac":
                $("#vaccineTech").append(`
                    <div class="vaccineTechCard" id="Tech${labName}">
                        <div class="vaccineTech-card-title">
                            <i class="fa-solid fa-vial-virus"></i> <div> Antígeno do Vírus Inativado - CoronaVac</div>
                        </div>
                        <div class="vaccineTech-card-body">
                            " O primeiro passo é desenvolver o vírus em algum substrato como células,
                            no caso da CoronaVac, ou ovos embrionados de galinha, técnica usada na vacina da gripe 
                            e na ButanVac, nova candidata a imunizante contra o SARS-CoV-2. Depois, o vírus passa 
                            pelo processo de purificação e, em seguida, é inativado. Muitas vezes, o processo de 
                            inativação pode ocorrer antes do processo de purificação.
                            Quando o corpo recebe a vacina, o sistema imune entende que o agente infeccioso está presente no organismo. 
                            O processo natural de proteção é desencadeado em função do que foi reconhecido pela vacinação e o organismo 
                            desenvolve anticorpos e outras estratégias de defesa para combater o corpo estranho ou as moléculas que fazem parte da vacina.
                            Desta forma, quando o organismo realmente encontrar o vírus, ele estará preparado para lidar com o patógeno em função da resposta 
                            previamente induzida pela vacinação, somada à resposta induzida pela infecção pelo patógeno."
                            </br><a target="_blank" rel="noopener noreferrer" href="https://butantan.gov.br/covid/butantan-tira-duvida/tira-duvida-noticias/entenda-como-funciona-a-tecnologia-de-virus-inativado-usada-na-coronavac">Fonte</a>
                        </div>
                    </div>
                `);
                break;
                
            case "Pfizer":
                $("#vaccineTech").append(`
                    <div class="vaccineTechCard" id="Tech${labName}">
                        <div class="vaccineTech-card-title">
                            <i class="fa-solid fa-shield-virus"></i> <div> RNA Mensageiro Sintético - Pfizer</div>
                        </div>
                        <div class="vaccineTech-card-body">
                            Segundo a Bula da Vacina: <br/>
                            "O RNA mensageiro com nucleosídeo modificado em Comirnaty® está formulado em nanopartículas lipídicas, 
                            permitindo que o RNA não replicante entre nas células hospedeiras para permitir a expressão transitória 
                            do antígeno S do vírus SARS-CoV-2. O mRNA codifica a proteína S integral ligada à membrana, com duas mutações 
                            pontuais na hélice central. A mutação destes dois aminoácidos para a prolina bloqueia a proteína S numa 
                            conformação pré-fusão antigenicamente preferida. A vacina induz imunidade celular e produção de anticorpos 
                            neutralizantes contra o antígeno spike (S), o que pode contribuir para a proteção contra a COVID-19." <br/><br/>
                            <a target="_blank" rel="noopener noreferrer" href="https://www.pfizer.com.br/sites/default/files/inline-files/Comirnaty_Profissional_de_Saude_36.pdf">Leia a Bula<a/>
                        </div>
                    </div>
                `);
                break;
                
            case "Janssen":
                $("#vaccineTech").append(`
                    <div class="vaccineTechCard" id="Tech${labName}">
                        <div class="vaccineTech-card-title">
                            <i class="fa-solid fa-virus-covid-slash"></i> <div> Vetores de Adenovírus Sorotipo 26 - Janssen</div>
                        </div>
                        <div class="vaccineTech-card-body">
                            Segundo a Bula da Vacina: </br>
                            " Vacina covid-19 (recombinante) é uma vacina monovalente composta por um vetor de adenovírus humano tipo 26 recombinante, incompetente para
                            replicação, que codifica uma glicoproteína spike (S) de comprimento total SARS-CoV-2 em uma conformação estabilizada. Após a administração, a
                            glicoproteína S de SARS-CoV-2 é expressa transitoriamente, estimulando tanto os anticorpos neutralizantes quanto outros funcionais específicos de
                            S, bem como respostas imunes celulares dirigidas contra o antígeno S, que podem contribuir para a proteção contra a COVID-19."
                            </br><a target="_blank" rel="noopener noreferrer" href="https://www.janssen.com/brasil/sites/www_janssen_com_brazil/files/prod_files/live/vacina_covid-19_recombinante_pub_vps.pdf">Leia a Bula<a/>
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
    AddSet(labName){
        switch (labName) {
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
            this.AddLabCard(labName);
            this.AddTechnology(labName);
            att.setCount = this.LabsSelecionados.size;
        }
    }
    MontarCard(Labs, primeiroCard){
        primeiroCard == true ? 
            $("#cardList").append(`
                <div class="col-3">
                    <div class="card">
                        <h4 class="card-title">${att.numDoses}ª Dose</h1>
                        <div class="card-body">
                            <div class="form-group">
                                <label>Laboratório / Vacina</label>
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
            `) 
        :
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
}

var att = {
    cards : [],
    numDoses : 1,
    setCount : 0,
    dataDoseAnterior : new Date()
}

$(document).ready(() => {
    app = new Index();
});