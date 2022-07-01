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
    updateProgressTaskList(tasks){
        // access to the task list
        const taskList = document.querySelector('#list');
        // empty tasklist
        taskList.innerHTML = '';

        
        tasks.forEach(task => {
            // created li 
            const li = document.createElement('li');
            li.classList = 'list-option mt-3 pb-2 row position-relative d-flex align-items-center';
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
                    <h6 class="title">
                        ${task.title}
                    </h6>
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

            // // access to the texts tag in li
            // const texts = li.querySelector('.texts');
            // // created categories in texts tag
            // task.categories.forEach(category => {
            //     // created span
            //     const span = document.createElement('span');
            //     span.classList = 'category mr-3';
            //     span.innerText = category;
            //     // append to texts
            //     texts.appendChild(span);

            // });
            // // append li to task list
            taskList.appendChild(li);

            // create eventlisteners on options
            createOptionsEvent(li);
        });

        // create eventlisteners on options
        function createOptionsEvent(li){
            // access to the elements
            const optionsBtn = li.querySelector('.icons #optionBtn'),
                  descriptonBox = li.querySelector('.description'),
                  optionBox = li.querySelector('.optionBox');

            optionsBtn.addEventListener('click', () => {
                optionBox.classList.toggle('active')
            })


                  
        }
        
    }
    updateCompleteTaskList(tasks){
        // access to the task list
        const taskList = document.querySelector('#list');

        // created li 
        const li = document.createElement('li');
        li.classList = 'list-option mt-3 row';
        
        
    }
}