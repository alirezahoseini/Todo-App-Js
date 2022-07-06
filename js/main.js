// Import Classes
const html= new Html();

/*----------------------------------
* * * * * *  * Varibles  * * * * *  
-----------------------------------*/




document.addEventListener('DOMContentLoaded', () => {
    newTask();
});



/*--------------------------------------------
* * * * * * * * * * Functions  * * * * * * * * 
---------------------------------------------*/


/*---------------------
       New Task
----------------------*/
function newTask(){
    // access to the elements
    const newTaskBtn = document.querySelector('#new-task-btn'),
          newTaskForm = document.querySelector('#new-task-form'),
          bgBlur = document.querySelector('#new-task-form .background-blur'),
          container = document.querySelector('.container'),
          titleInput = document.querySelector('#title');
    let progressTasks = [];
    let completeTasks = [];


    // functions 
    loadTasks();
    openAndCloseForm();
    formValidation();
    createdCategory();


    // open and close form
    function openAndCloseForm(){
        // set click event on new task button
        newTaskBtn.addEventListener('click', () => {
            // show form blur container
            newTaskForm.classList.add('active');
            container.classList.add('blur');
            // Reset form
            html.resetNewTaskForm();
            // Push new id to browser history
            window.history.pushState({id:1}, 'id' ,'/projects/todo?id=CreatedNewTask');
        });
        // set click event on bgBlur
        bgBlur.addEventListener('click', () => {
            closer();
            // back to prev history
            window.history.back();
        });


        // if back button clicked
        window.addEventListener('popstate', () => {
            // close form 
            closer();
            // access to the category elements
            const bgBlur = document.querySelector('#categories-form .background-blur'),
            categoriesBox = document.querySelector('#categories-form');
            // hide category box
            categoriesBox.classList.remove('active');
            bgBlur.classList.remove('active');
            // set default url
            console.log(window.history.length);
            window.history.replaceState({id:1}, 'default url', '/projects/todo');
        });

        // close form
        function closer(){
            // hide form class on container
            newTaskForm.classList.remove('active');
            container.classList.remove('blur');
            // reset form
            html.resetNewTaskForm();
        }
    }

    // form validation
    function formValidation(){
        newTaskForm.addEventListener('submit', (event) => {
            event.preventDefault();
            // access to the form inputs
            const title =  newTaskForm.querySelector('#title'),
                  category = newTaskForm.querySelector('input[name="select-category"]:checked'),
                  priority = newTaskForm.querySelector('input[name="priority"]:checked');

            
            // access to the task length
            let taskLength = JSON.parse(localStorage.getItem('progressTasks'));
            taskLength = taskLength.length;
                  
            // validattion title
            if(title.value == null || title.value == '' || title.value == ' '){
                html.showMessage('Please Enter a Titel');
                // validattion categories
            } else if(category == null){
                html.showMessage('Please Select a Category');
                // validattion priority
            } else if(priority == null){
                html.showMessage('Please Select a Priority');
            }else if(newTaskForm.classList.contains('edite')){
                // access to the task id
                const taskId = newTaskForm.getAttribute('taskId');

                // created task object
                const task = {
                    title: title.value,
                    category: category.getAttribute('id'),
                    priority:  priority.getAttribute('id'),
                    taskId: taskId,
                    complete: false
                }
                // EDITE
                html.editeTaskFromDomAndLS(taskId, task);
            }else {
                // created task object
                const task = {
                    title: title.value,
                    category: category.getAttribute('id'),
                    priority:  priority.getAttribute('id'),
                    taskId: idGnrataor(),
                    complete: false
                }
                // hide form and remove blur class on container
                container.classList.remove('blur');
                newTaskForm.classList.remove('active');
                // Created New Task
                createdNewTask(task);
                // REST FORM
                html.resetNewTaskForm();
            }
        })
    }

    // Created New Category
    function createdCategory(){
        // access to the elements
        const newCategoryBtn = document.querySelector('#new-category-btn'),
              newTaskForm = document.querySelector('#new-task-form'),
              bgBlur = document.querySelector('#categories-form .background-blur'),
              categoriesBox = document.querySelector('#categories-form'),
              form = document.querySelector('#categories-form form'),
              input = form.querySelector('#new-category-input');

        // Created ls categories
        let categories;

        // ------- Functions ------------ //
        getLocalStorageData();
        openAndCloseForm();
        create();



        // Acssess to the local storage Data
        function getLocalStorageData(){
            // first load data
            const lsData = localStorage.getItem('categories');
            // if ls data is nul === created empty array
            if(lsData === null || ''){
                localStorage.setItem('categories', '[]');
                categories = [];
            }
            else{
                // else set ls data to categories array and set data in DOM
                categories = JSON.parse(lsData);
                updateCategories();
            }
        }


        // open and close form
        function openAndCloseForm(){
            //  set click event on new category btn ----> open category box
            newCategoryBtn.addEventListener('click', () => {
                categoriesBox.classList.add('active');
                newTaskForm.classList.remove('active');
                container.classList.add('blur');
                // focus in input
                setTimeout(() => {
                    input.focus();
                }, 200);
            });
            // set click event on bg blur ----> close category box
            bgBlur.addEventListener('click', ()=>{
                categoriesBox.classList.remove('active');
                newTaskForm.classList.add('active');
            });

        }


        // created new category 
        function create(){
            form.addEventListener('submit', (event) => {
                event.preventDefault();
                // access to the input value
                const inputValue = form.querySelector('input').value;

                // validation 
                const validation = isValid(inputValue);
                // Chack Exist Category in list
                const checkData = isExist(inputValue);
                if(validation){
                    html.showMessage('Space is not allowed')
                }else if(checkData === false){
                    // push input value in categoris array
                    categories.push(inputValue);
                    // add new category to localstorage
                    localStorage.setItem('categories', JSON.stringify(categories));
                    // update category list
                    updateCategories();
                    input.value = '';
                }else{
                    // show err message
                    html.showMessage('This Category Exist in list..!')
                }

            });


            // Chacking exist category
            function isExist(value){
                // search in categories
                const finder = categories.filter((category) => {
                    return category == value;
                });
                // if exist
                if(finder.length === 0){
                    return false;
                } else{
                    return true;
                }
            }

            // Validation inpute value
            function isValid(value){
                const pattern = /( )/;
                const result = pattern.test(value);
                return result;
            }
        }


        // Update categories
        function updateCategories(){
            // access to the lsData
            const lsData = JSON.parse(localStorage.getItem('categories'));

            
            // access to the elements
            const categoryFormList =  categoriesBox.querySelector('#category-list');
            const addNewTaskList = newTaskForm.querySelector('.task-categories');


            // Remove list options
            categoryFormList.innerHTML = '';
            addNewTaskList.innerHTML = '';
            
            // Each in categories
            lsData.forEach((category, index) => {


                // update categoryBox list
                upCtegoryBoxList();
                function upCtegoryBoxList(){

                    // created li tag
                    const li = document.createElement('li');
                    // set class list 
                    li.classList = 'category-option m-2 d-flex align-items-center justify-content-between py-2 px-3';
                    // set attr
                    li.setAttribute('category-id', category);
                    li.setAttribute('category-index', index);
                    // created html template
                    li.innerHTML = `
                        <span class="name">${category}</span>
                        <i class="fa-duotone fa-trash ml-3"></i>
                    `;
    
                    // append li to the list
                    categoryFormList.appendChild(li);
                }


                // update add new task list
                upNewTaskList();
                function upNewTaskList(){
                    // created div tag 
                    const div = document.createElement('div');
                    // set class list
                    div.classList = 'radio-group mx-2';
                    // set attr
                    div.setAttribute('category-id', category);
                    div.setAttribute('category-index', index);
                    // created html template
                    div.innerHTML = `
                    <input type="radio" name="select-category" id="${category}">
                    <label for="${category}" class="">${category}</label>
                    `;
    
                    // append div to the list
                    addNewTaskList.appendChild(div);
                }

            });

            // update remove category
            removeCategory();
        }

        
        // Remove Ctegory
        function removeCategory(){
            // access to the all categories
            const liTags = document.querySelectorAll('.category-option');
            // each in li tags
            liTags.forEach((liTag, index) => {
                // set click event on delete buttons
                liTag.children[1].addEventListener('click', () =>{
                    // remove li from categories array
                    categories.splice(index, 1);
                    // remove li from local storage
                    localStorage.setItem('categories', JSON.stringify(categories));
                    // update categories list
                    updateCategories();

                })
            });
        }
              
    }

    // Load Task From Local Storage
    function loadTasks(){
        // access to the progress tasks from LS
        const progressData = localStorage.getItem('progressTasks');
        // access to the complate tasks from LS
        const completeData = localStorage.getItem('completeTasks');


        // if  progress tasks is nul === created empty array
        if(progressData === null || progressData == '' || progressData == '[]'){
            localStorage.setItem('progressTasks', '[]');
            progressTasks = [];
        }
        else{
            // else set  progress tasks to categories array and set data in DOM
            progressTasks = JSON.parse(localStorage.getItem('progressTasks'));
            html.loadProgressTasks(progressTasks);
        }


        // if  complete tasks is nul === created empty array
        if(completeData === null || progressData == '' || progressData == '[]'){
            localStorage.setItem('completeTasks', '[]');
            completeTasks = [];
        }
        else{
            // else set complete tasks to categories array and set data in DOM
            completeTasks = JSON.parse(localStorage.getItem('completeTasks'));
            html.updateCompleteTaskList(completeTasks);
        }
    }

    // Created New Task
    function createdNewTask(task){

        // push task to task array
        progressTasks.push(task);
        // set task array to local storage
        localStorage.setItem('progressTasks', JSON.stringify(progressTasks));
        // created task in DOM
        html.addNewTaskToList(task);
        
        
    }

    // Created Unique id
    function idGnrataor(){
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }


    
}