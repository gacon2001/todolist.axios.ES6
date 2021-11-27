export default class TaskService {
    getListTaskApi (){
        return axios ({
            url: "https://6183caff91d76c00172d1b69.mockapi.io/TodolistBTbuoi26",
            method: "GET",
        }) 
    }

    addTaskApi (task){
        return axios({
            url: "https://6183caff91d76c00172d1b69.mockapi.io/TodolistBTbuoi26",
            method: "POST",
            data: task,
        })
    }

    deleteTaskApi (id){
        return axios ({
            url: `https://6183caff91d76c00172d1b69.mockapi.io/TodolistBTbuoi26/${id}`,
            method: "DELETE",
        })
    }

    getTaskById (id){
        return axios({
            url: `https://6183caff91d76c00172d1b69.mockapi.io/TodolistBTbuoi26/${id}`,
            method: "GET",
        })
    }

    updateTaskApi (task){
        return axios ({
            url: `https://6183caff91d76c00172d1b69.mockapi.io/TodolistBTbuoi26/${task.id}`,
            method: "PUT", 
            data: task,
        })
    }
}