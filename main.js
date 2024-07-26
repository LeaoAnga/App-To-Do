const section = document.getElementById("tasks-container");
const atividades = [
  {
    nome: 'Visitar Farol da Barra',
    lugar: 'Salvador',
    data: '2024-07-06 00:00',
    finalizada: false,
  },
];
const inputText = document.querySelector("input[type='text']");
const inputDate = document.getElementById("seletor-dia");
const inputHour = document.getElementById("seletor-hora");
//Biblioteca Dayjs
const formatador = (data) => {
  return {
    dia: {
      numerico: dayjs(data).format("DD"),
      semana: {
        curto: dayjs(data).format("ddd"),
        longo: dayjs(data).format("dddd"),
      },
    },
    mes: {
      longo: dayjs(data).format("MMMM"),
      curto: dayjs(data).format("MM"),
    },
    hora: dayjs(data).format("HH:mm"),
  };
};

const mostrarAtividade = (atividade) => {
  let input = `
    <input 
    onchange="concluirAtividade(event)"
    type="checkbox"
    value="${atividade.data}">
    </input>  
    `;
  const formatar = formatador(atividade.data);

  if (atividade.finalizada) {
    input = `
    <input 
    onchange="concluirAtividade(event)"
    type="checkbox"
    value="${atividade.data}"
    checked>
    </input> 
    `;
  }

  return `
    <div class="card-bg">
      <label>
        <div class="input-wrapper">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="active">
            <path d="M7.50008 9.99999L9.16675 11.6667L12.5001 8.33332M18.3334 9.99999C18.3334 14.6024 14.6025 18.3333 10.0001 18.3333C5.39771 18.3333 1.66675 14.6024 1.66675 9.99999C1.66675 5.39762 5.39771 1.66666 10.0001 1.66666C14.6025 1.66666 18.3334 5.39762 18.3334 9.99999Z" stroke="#BEF264" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" class="active"/>
          </svg>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="inactive">
            <path d="M8.41664 1.81833C9.46249 1.61593 10.5374 1.61593 11.5833 1.81833M11.5833 18.1817C10.5374 18.3841 9.46249 18.3841 8.41664 18.1817M14.6741 3.10083C15.5587 3.70019 16.3197 4.46406 16.9158 5.35083M1.8183 11.5833C1.6159 10.5375 1.6159 9.46252 1.8183 8.41667M16.8991 14.6742C16.2998 15.5587 15.5359 16.3198 14.6491 16.9158M18.1816 8.41667C18.384 9.46252 18.384 10.5375 18.1816 11.5833M3.1008 5.32583C3.70016 4.44128 4.46403 3.68023 5.3508 3.08417M5.3258 16.8992C4.44124 16.2998 3.6802 15.5359 3.08414 14.6492" stroke="#A1A1AA" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" class="inactive"/>
          </svg>
          ${input}
          <div class="card-names">
          <span class="nome">${atividade.nome}, <span class="lugar">${atividade.lugar}</span>
          </span>
          </div>
          </div>
          <time class='full'>
            ${formatar.dia.semana.longo}, 
            dia ${formatar.dia.numerico} 
            de 
            ${formatar.mes.longo} às 
            ${formatar.hora} 
          </time>
          <time class='short'>
            ${formatar.dia.semana.curto},
            ${formatar.dia.numerico}/${formatar.mes.curto} <br>
            às ${formatar.hora}
          </time>
         <button class="trash" onclick="excluirAtividade(event)">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
          </button>
        </label>
  </div>
    `;
};

const atualizarListaDeAtividades = () => {
  section.innerHTML = "";
  if (atividades.length === 0) {
    section.innerHTML = `<p> Nenhuma atividade cadastrada </p>`;
  }
  for (let atividade of atividades) {
    section.innerHTML += mostrarAtividade(atividade);
  }
};

const salvarAtividade = (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);

  const nome = formData.get("atividade");
  const lugar = formData.get("lugar");
  const dia = formData.get("dia");
  const hora = formData.get("hora");
  const data = `${dia} ${hora}`;

  const novaAtividade = {
    nome,
    lugar,
    data,
    finalizada: false,
  };

  const atividadeExiste = atividades.find((atividade) => {
    return atividade.data === novaAtividade.data;
  });

  if (atividadeExiste) {
    return alert("Dia e Hora não disponível.");
  }

  inputText.value = "";
  atividades.push(novaAtividade);
  atualizarListaDeAtividades();
};

const concluirAtividade = (e) => {
  //acha atividade dentro da array 'atividades'
  let atividadeAtual = atividades.find(
    (atividade) => e.target.value === atividade.data
  );

  console.table(atividadeAtual);
  console.log(atividadeAtual);
  //verifica se a atividade existe
  if (atividadeAtual) {
    //se a atividade existir, ivnerte o valor da propriedade 'finalizada' e altera o svg visível na atividade em questão
    if (atividadeAtual.finalizada == false) {
      atividadeAtual.finalizada = true;
      console.log("finalizado");
      atualizarListaDeAtividades();
      return;
    } else {
      atividadeAtual.finalizada = false;
      console.log("atividade ainda em conclusão");
      atualizarListaDeAtividades();
      return;
    }
  } else {
    alert("Atividade não encontrada");
    console.log("valor comparado não encontrado");
    return;
  }
};

const criarSelecao = () => {
  const dias = [
    "2024-07-06",
    "2024-07-07",
    "2024-07-13",
    "2024-07-14",
    "2024-07-20",
    "2024-07-21",
    "2024-07-27",
    "2024-07-28",
  ];

  let diasSelecao = ``;

  for (let dia of dias) {
    const formatar = formatador(dia);
    const diaFormatado = `
    ${formatar.dia.numerico} de ${formatar.mes.longo}
    `;

    diasSelecao += `
    <option value="${dia}">${diaFormatado}</option>`;
  }

  inputDate.innerHTML = diasSelecao;

  //selecao de horas
  let horasSelecao = ``;
  for (let i = 0; i <= 24; i++) {
    for (let j = 0; j < 60; j += 10) {
      const hour = String(i).padStart(2, "0");
      const minute = String(j).padStart(2, "0");
      horasSelecao += `
      <option value="${hour}:${minute}">${hour}:${minute}</option>`;
    }
  }

  inputHour.innerHTML = horasSelecao;
};

const excluirAtividade = e => {
  return alert('Feature ainda não desenvolvida. Volte outro dia para experimentar!')
}

criarSelecao();
atualizarListaDeAtividades();
