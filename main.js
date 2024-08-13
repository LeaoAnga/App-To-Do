const section = document.getElementById("tasks-container");
const tasks = [
  {
    name: "Visitar Farol da Barra",
    place: "Salvador",
    date: "2024-07-06 00:00",
    done: false,
    importance: "medium",
  },
];
const inputText = document.querySelector("input[type='text']");
const inputDate = document.getElementById("selector-day");
const inputHour = document.getElementById("selector-hour");
//Biblioteca Dayjs
const formatter = (date) => {
  return {
    day: {
      numeric: dayjs(date).format("DD"),
      week: {
        short: dayjs(date).format("ddd"),
        long: dayjs(date).format("dddd"),
      },
    },
    month: {
      long: dayjs(date).format("MMMM"),
      short: dayjs(date).format("MM"),
    },
    hour: dayjs(date).format("HH:mm"),
  };
};

const showTasks = (task) => {
  let input = `
    <input 
    onchange="taskDone(event)"
    type="checkbox"
    value="${task.date}">
    </input>  
    `;
  const format = formatter(task.date);

  if (task.done) {
    input = `
    <input 
    onchange="taskDone(event)"
    type="checkbox"
    value="${task.date}"
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
          <div class="card-namonth">
          <span class="name">${task.name}, <span class="place">${task.place}</span>
          </span>
          </div>
          </div>
          <time class='full'>
            ${format.day.week.long}, 
            day ${format.day.numeric} 
            de 
            ${format.month.long} às 
            ${format.hour} 
          </time>
          <time class='short'>
            ${format.day.week.short},
            ${format.day.numeric}/${format.month.short} <br>
            às ${format.hour}
          </time>
         <button class="trash" onclick="excludeTask(event)">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
          </button>
        </label>
  </div>
    `;
};

const updateTaskList = () => {
  section.innerHTML = "";
  if (tasks.length === 0) {
    section.innerHTML = `<p> Nenhuma task cadastrada </p>`;
  }
  for (let task of tasks) {
    section.innerHTML += showTasks(task);
  }
};

const saveTask = (e) => {
  e.preventDefault();

  const formDate = new FormData(e.target);

  const name = formDate.get("task");
  const place = formDate.get("place");
  const day = formDate.get("day");
  const hour = formDate.get("hour");
  const date = `${day} ${hour}`;

  const newTask = {
    name,
    place,
    date,
    done: false,
  };

  const hasTask = tasks.find((task) => {
    return task.date === newTask.date;
  });

  if (hasTask) {
    return alert("Dia e hora não disponível.");
  }

  inputText.value = "";
  tasks.push(newTask);
  updateTaskList();
};

const taskDone = (e) => {
  //acha task dentro da array 'tasks'
  let actualTask = tasks.find((task) => e.target.value === task.date);

  console.table(actualTask);
  console.log(actualTask);
  //verifica se a task existe
  if (actualTask) {
    //se a task existir, ivnerte o valor da propriedade 'done' e altera o svg visível na task em questão
    if (actualTask.done == false) {
      actualTask.done = true;
      console.log("finalizado");
      updateTaskList();
      return;
    } else {
      actualTask.done = false;
      console.log("Tarefa ainda em conclusão");
      updateTaskList();
      return;
    }
  } else {
    alert("Tarefa não encontrada");
    console.log("valor comparado não encontrado");
    return;
  }
};

const createSelection = () => {
  const days = [
    "2024-07-06",
    "2024-07-07",
    "2024-07-13",
    "2024-07-14",
    "2024-07-20",
    "2024-07-21",
    "2024-07-27",
    "2024-07-28",
  ];

  let selectionDays = ``;

  for (let day of days) {
    const format = formatter(day);
    const dayFormatado = `
    ${format.day.numeric} de ${format.month.long}
    `;

    selectionDays += `
    <option value="${day}">${dayFormatado}</option>`;
  }

  inputDate.innerHTML = selectionDays;

  //selecao de hours
  let selectionHours = ``;
  for (let i = 0; i <= 24; i++) {
    for (let j = 0; j < 60; j += 10) {
      const hour = String(i).padStart(2, "0");
      const minute = String(j).padStart(2, "0");
      selectionHours += `
      <option value="${hour}:${minute}">${hour}:${minute}</option>`;
    }
  }

  inputHour.innerHTML = selectionHours;
};

const excludeTask = (e) => {
  return alert(
    "Feature ainda não desenvolvida. Volte outro day para experimentar!"
  );
};

createSelection();
updateTaskList();
