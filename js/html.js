class Html{
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
    loadProgressTasks(tasks){

        for (let index = 0; index < tasks.length; index++) {
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
    addNewTaskToList(task){
        // access to the task list
        const taskList = document.querySelector('#list');
        // created li 
        const li = document.createElement('li');
        li.classList = 'list-option slide-right mt-3 pb-2 row position-relative d-flex align-items-center';
        li.setAttribute('priority', task.priority);
        li.setAttribute('id', task.title);
        li.setAttribute('complete', task.complete);


        // Created template
        li.innerHTML = `
        <div class="body d-flex align-items-center col-10 p-0">
            <div class="checkbox-container p-0 d-flex align-items-center justify-content-center mr-2 ">
                <input type="checkbox" name="${task.title}" >
                <div class="checkmark d-flex align-items-center justify-content-center">
                    <i class="fa-solid fa-check"></i>
                </div>
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
                <i class="fa-solid fa-ellipsis-vertical" id='optionBtn'></i>
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
        createOptionsEvent(li);

        /*---------------------
                Options
        ----------------------*/
        // create eventlisteners on options
        function createOptionsEvent(li){
            // access to the elements
            const optionsBtn = li.querySelector('.icons #optionBtn'),
            optionBox = li.querySelector('.optionBox');

            // Open and close option box
            openAndCloseBox();
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
            editeTask();
            function editeTask(){
                // access to the elements
                const editeBtn = optionBox.querySelector('.edite-task'),
                      newTaskForm = document.querySelector('#new-task-form'),
                      container = document.querySelector('.container'),
                      title =  newTaskForm.querySelector('#title');

                // set click event on edite button
                editeBtn.addEventListener('click', () => {
                    // access to the radio inputs
                    const category = newTaskForm.querySelector(`input#${task.category}`),
                    priority = newTaskForm.querySelector(`input#${task.priority}`);

                    // open form
                    newTaskForm.classList.add('active');
                    newTaskForm.classList.add('edite');
                    newTaskForm.setAttribute('old-id', task.title);
                    container.classList.add('blur');
                    // set task data in form
                    title.value = task.title;
                    try {
                        category.checked = true;
                    } catch (error) {
                        html.showMessage(`${task.category} Category not find.!`)
                    }
                    priority.checked = true;

                    // close option box
                    optionBox.classList.remove('active');

                    
                })
            }
        }
    }
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
}