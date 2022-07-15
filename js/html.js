class Html{
    // Show message To User
    showMessage(message){
        // access to the message box
        const messageBox = document.querySelector('#message-box');

        // created div
        const div = document.createElement("div");
        div.classList = 'message col-10 col-md-8 col-lg-7 mx-auto text-center bg-danger text-white p-3 d-flex align-items-center justify-content-start my-3';

        // created message template
        div.innerHTML = `
            <div class="icon mr-3 d-flex align-items-center justify-content-center">
                <i class="fa-duotone fa-warning"></i>
            </div>
            <span class="h6 mt-2">${message}</span>
        `;

        // append div in message box
        messageBox.appendChild(div);

        // add show class in div
        setTimeout(() => {
            div.classList.add('show');
        }, 100);
        setTimeout(() => {
            div.classList.add('hidden');
        }, 3000);
        setTimeout(() => {
            div.remove();
        }, 3300);
    }

    // Loading task after load page
    loadProgressTasks(tasks){

        for (let index = 0; index < tasks.length ; index++) {
            this.addNewTaskToList(tasks[index]); 
        }
        
    }

    updateCompleteTaskList(tasks){
        // access to the task list
        const taskList = document.querySelector('#list');

        // created li 
        const li = document.createElement('li');
        li.classList = 'list-option mt-3 row';
        
        
    }

    // Create New Task
    addNewTaskToList(task){
 
        // access to the task list
        const taskList = document.querySelector('#list');
        // created li 
        const li = document.createElement('li');
        li.classList = 'list-option slide-right mt-3 pb-2 row position-relative d-flex align-items-center';
        li.setAttribute('priority', task.priority);
        li.setAttribute('id', task.taskId);
        li.setAttribute('complete', task.complete);


        // Created template
        li.innerHTML = `
        <div class="body d-flex align-items-center col-10 p-0">
            <div class="checkbox-container p-0 d-flex align-items-center justify-content-center mr-2" title="Complete Task">
                <input type="checkbox" class='checkbox' name="${task.taskId}">
                <label class="checkmark d-flex align-items-center justify-content-center">
                    <i class="fa-solid fa-check"></i>
                </label>
            </div>
            <div class="texts ml-2 my-1">
                <p class='title font-weight-bold'>
                    ${task.title}
                </p>
                <span class='category mr-3'>
                    ${task.category}
                </span>
                <span class='priority mr-3 ${task.priority}'>
                    ${task.priority}
                </span>
            </div>
        </div>
        <div class="options ml-auto col-2 col-md-1 text-right p-0 pr-1">
            <div class="icons w-100 d-flex justify-content-end">
                <i class="fa-solid fa-ellipsis-vertical" id='optionBtn' title='More Options'></i>
                <div class='optionBox'>
                    <div class='edite-task d-flex align-items-center justify-content-between'>
                        <i class='fa-duotone fa-pen'></i>
                        <span>Edite</span>
                    </div>
                    <div class='remove-task d-flex align-items-center justify-content-between'>
                        <i class='fa-duotone fa-trash'></i>
                        <span>Delete</span>
                    </div>
                </div>
            </div>
        </div>
        `;

        // append li to task list
        taskList.insertBefore(li, taskList.children[0]);
        // remove slide-right class on li
        setTimeout(() => {
            li.classList.remove('slide-right');
        }, 10);
        

        // create eventlisteners on options
        this.createOptionsEvent(li, task);
    }

    // Reset New Task Form
    resetNewTaskForm(){
        // access to the elements
        const newTaskForm = document.querySelector('#new-task-form'),
        title =  newTaskForm.querySelector('#title'),
        category = newTaskForm.querySelector('input[name="select-category"]:checked'),
        priority = newTaskForm.querySelector('input[name="priority"]:checked');

        if(newTaskForm.classList.contains('edite')){
            newTaskForm.classList.remove('edite');
        }
        // reset input values
        title.value = '';
        if(category !== null){
            category.checked = false;
        } 
        if(priority !== null){
            priority.checked = false;
        }
    }

    // Create Edite And Delete Option On Progress Tasks
    createOptionsEvent(li, task){
        // access to the elements
        const optionsBtn = li.querySelector('.icons #optionBtn'),
        optionBox = li.querySelector('.optionBox');
        

        // FUNCTIONS 
        openAndCloseBox();
        editeTaskButton();
        removeTaskButton();
        taskCheckBox();


        // Open and close option box
        function openAndCloseBox(){
            // set click event on option btn
            optionsBtn.addEventListener('click', () => {
                // access to open box
                const openOptionBox = document.querySelector('.optionBox.active');
                // open option box
                optionBox.classList.toggle('active');
                // close open boxes
                if(openOptionBox !== null){
                    openOptionBox.classList.remove('active');
                }
            });
        }

        // Edite task
        function editeTaskButton(){
            // access to the elements
            const editeBtn = optionBox.querySelector('.edite-task'),
                  newTaskForm = document.querySelector('#new-task-form'),
                  container = document.querySelector('.container'),
                  title =  newTaskForm.querySelector('#title');

            // set click event on edite button
            editeBtn.addEventListener('click', () => {
                // access to the all task from local storage
                const progressTasks = JSON.parse(localStorage.getItem('progressTasks'));
                // created task index
                let taskIndex = 0;
                // each in tasks and find current task index
                progressTasks.forEach((prTask , index)=> {
                    if(task.taskId == prTask.taskId){
                        taskIndex = index;
                    }
                });

                // access to current task
                const currentTask = progressTasks[taskIndex];
                // access to the radio inputs
                const category = newTaskForm.querySelector(`input#${currentTask.category}`),
                priority = newTaskForm.querySelector(`input#${currentTask.priority}`);

                // open form
                newTaskForm.classList.add('active');
                newTaskForm.classList.add('edite');
                newTaskForm.setAttribute('taskId', currentTask.taskId);

                // set task data in form
                title.value = currentTask.title;
                try {
                    category.checked = true;
                } catch (error) {
                    html.showMessage(`${currentTask.category} Category not find.!`)
                }
                priority.checked = true;


                // add blur class to container
                container.classList.add('blur');
                // close option box
                optionBox.classList.remove('active');

                // Push new id to browser history
                window.history.pushState({id:1}, 'id' ,'/projects/todo?id=CreatedNewTask');
            });
        }

        // Remove Task
        function removeTaskButton(){
            // Access to the Elements
            const removeButton = optionBox.querySelector('.remove-task');
            
            
            // Set click event on remove button
            removeButton.addEventListener('click', () => {
                html.setDataToConfirmBox(li, 'progress');
            });
        }

        // check box
        function taskCheckBox(){
            // access to the check box
            const checkbox = li.querySelector('input[type="checkbox"]');
            const taskId = li.getAttribute('id');
            // access to the notifiction audio
            const audio = document.querySelector('audio');

            // set change event on checkbox
            checkbox.addEventListener('change', () => {
                // play audio
                audio.play();
                // add task to complete list
                html.addTaskToCompleteList(task);
                // hidde and remove task from dom after 200ms
                setTimeout(() => {
                    li.classList.add('complete');
                    setTimeout(() => {
                        li.remove();
                    }, 350);
                }, 200);


                // --------- remove task in progressList from local storage
                let progressTasks = JSON.parse(localStorage.getItem('progressTasks'));
                progressTasks.forEach((currentTask, index) => {
                    if(currentTask.taskId == taskId){
                        progressTasks.splice(index, 1);
                        localStorage.setItem('progressTasks', JSON.stringify(progressTasks))
                    }
                });

                // -------- add task to the complete list from local storage
                // access to the complete tasks
                let completeTasks = JSON.parse(localStorage.getItem('completeTasks'));
                completeTasks.push(task);
                localStorage.setItem('completeTasks', JSON.stringify(completeTasks));
            });
        }
    }

    // Edite Task
    editeTaskFromDomAndLS(taskId, newTaskObject){
        // access to the all tasks
        const allTasks = JSON.parse(localStorage.getItem('progressTasks'));
        // access to the task index
        let taskIndex = '';

        
        /*----------------------------
        Edite Task in LocalStorage
        ----------------------------*/
        editeTaskInLS()
        function editeTaskInLS(){
            // each in tasks and find task index
            allTasks.forEach((task, index )=> {
                if(taskId == task.taskId){
                    taskIndex = index;
                }
            });

            // set new task in tasks array
            allTasks.splice(taskIndex, 1, newTaskObject);

            // set task array in ls
            localStorage.setItem('progressTasks', JSON.stringify(allTasks));
        }


        /*----------------------------
        Edite Task in Dom
        ----------------------------*/
        editeTaskInDom();
        function editeTaskInDom(){
            // access to the all tasks div
            const allTaskDivs = document.querySelectorAll(`.list-option`);
            // each in tasks divs and find task index
            allTaskDivs.forEach((task, index )=> {
                if(taskId == task.getAttribute('id')){
                    taskIndex = index;
                }
            });
            
            // Change task Data ====> se new data
            const taskDiv = allTaskDivs[taskIndex];

            // access to the elements
            const title = taskDiv.querySelector('.title'),
                  category = taskDiv.querySelector('.category'),
                  priority = taskDiv.querySelector('.priority');

            taskDiv.setAttribute('priority', newTaskObject.priority);
            title.innerHTML = newTaskObject.title;
            category.innerHTML = newTaskObject.category;
            priority.classList = `priority mr-3 ${newTaskObject.priority}`
            priority.innerHTML = newTaskObject.priority;

            // hide form and remove blur class on container
            const newTaskForm = document.querySelector('#new-task-form'),
                  container = document.querySelector('.container');


            container.classList.remove('blur');
            newTaskForm.classList.remove('active');
        }

    }

    // Set Data To The Confirm Box
    setDataToConfirmBox(taskLi, status){
        // access to the Confirm Box
        const confirmBox = document.querySelector('#confirm-box');
        // access to the task id
        const taskId = taskLi.getAttribute('id');
        // set Data to the confirm box
        confirmBox.setAttribute('task-id', taskId);
        confirmBox.setAttribute('status', status);


        /*---------------------------
          Open And Close Confirm box
        ----------------------------*/
        // Access To the Elements
        const container = document.querySelector('.container'),
        optionsBox = taskLi.querySelector('.optionBox'),
        bgBlur = confirmBox.querySelector('.background-blur');


        // Box Opener 
        boxOpener();
        function boxOpener(){
            // ----- show and active confirm box
            confirmBox.classList.add('active');
            optionsBox.classList.remove('active');
            container.classList.add('blur');
            // Push new id to browser history
            window.history.pushState({id:1}, 'id' ,'/projects/todo?id=deleteTask');

            // ----- hide and close confirm box
            // set click event on bg blur
            bgBlur.addEventListener('click', () => {
                closer();
                // set default url
                window.history.replaceState({id:1}, 'default url', '/projects/todo');
            });
            // set
            window.addEventListener('popstate', () => {
                closer();
            })
        }


        // Box Closer
        function closer(){
            container.classList.remove('blur');
            confirmBox.classList.remove('active');
            // set default url
            window.history.replaceState({id:1}, 'default url', '/projects/todo');
        }
    }

    // add new task to complete list
    addTaskToCompleteList(task){
        console.log(task);
    }
}