






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

    // open and close form
    openAndCloseForm();
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
}