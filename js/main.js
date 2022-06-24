// Import Classes
const html= new Html();






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
          bgBlur = document.querySelector('.background-blur'),
          container = document.querySelector('.container'),
          closeBtn = document.querySelector('.close-btn');

    // functions 
    openAndCloseForm();
    formValidation();


    // open and close form
    function openAndCloseForm(){
        // set click event on new task button
        newTaskBtn.addEventListener('click', () => {
            // show form and blur container
            container.classList.add('blur');
            newTaskForm.classList.add('active');
        });
        // set click event on bgBlur
        bgBlur.addEventListener('click', () => {
            // hide form and remove blur class on container
            console.log('click');
            container.classList.remove('blur');
            newTaskForm.classList.remove('active');
        });
        // set click event on close btn
        closeBtn.addEventListener('click', () => {
            // hide form and remove blur class on container
            container.classList.remove('blur');
            newTaskForm.classList.remove('active');
        });
    }

    // form validation
    function formValidation(){
        newTaskForm.addEventListener('submit', (event) => {
            event.preventDefault();
            // access to the form inputs
            const title =  newTaskForm.querySelector('#title'),
                  description = newTaskForm.querySelector('#description'),
                  categories = newTaskForm.querySelectorAll('input[type="checkbox"]:checked'),
                  priority = newTaskForm.querySelector('input[name="priority"]:checked');

            // validattion title
            if(title.value == null || title.value == '' || title.value == ' '){
                html.showMessage('Please Enter a Titel');
                // validattion categories
            } else if(categories.length == 0){
                html.showMessage('Please Select a Category');
                // validattion priority
            } else if(priority == null){
                html.showMessage('Please Select a Priority');
            }else {
                // Created New Task
                createdNewTask(title.value, categories, priority.getAttribute('id'), description.value);
            }
        })
    }

    // Created New Task
    function createdNewTask(title, categories, priority, description){
        console.log(title);
        console.log(categories);
        console.log(priority);
        console.log(description);
    }
}