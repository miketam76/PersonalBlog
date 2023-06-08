/* List of all courses taken in Level 1 and 2 */
const courses = [

    { courseCode: 'CST8101', title: 'Computer Essentials', level: '1', description: 
    'Teaches the fundamentals of computer software, hardware, and laptop management', image: './images/CST8101.jpg' },
    { courseCode: 'CST8116', title: 'Introduction to Computing Programming', level:'1', description:
    'Teaches the fundamentals of computer programming using Java as the learning platform', image: './images/CST8116.jpg'},
    { courseCode: 'CST8215', title: 'Introduction to Databases', level: '1', description: 
    'Teaches the fundamentals of database design and SQL language', image: './images/CST8215.jpg'},
    { courseCode: 'CST8300', title: 'Achieving Success in Changing Environments', level: '1', description:
    'Teaches the fundamentals of building your soft skills and colaboration skills in order to succeed in the workplace', image: './images/CST8300.jpg'},
    { courseCode: 'CST2355', title: 'Database Systems', level: '2', description: 
    'Demonstrates the usage of different RDBMS software and PL-SQL', image: './images/CST2355.jpg'},
    { courseCode: 'CST8102', title: 'Operating System Fundamentals (GNU/Linux)', level: '2', description: 
    'Teaches the fundamentals of the usage and management of a Linux operating system environment', image: './images/CST8102.jpg'},
    { courseCode: 'CST8284', title: 'Object Oriented Programming (Java)', level: '2', description: 
    'Teaches more advanced topics on object oriented programming using Java programming language', image: './images/CST8284.jpg'},
    { courseCode: 'CST8285', title: 'Web Programming', level: '2', description: 
    'Teaches the basic fundamentals of web development using HTML, CSS, and Javascript', image: './images/CST8285.jpg'},
    { courseCode: 'GEP1001', title: 'Cooperative Education Readiness', level: '2', description: 
    'Prepares students through the CO-OP process of workshops on how to create CO-OP cover letter and resume, applying to positions, and preparing for interviews ', image: './images/GEP1001.jpg'},
    { courseCode: 'HOS2228', title: 'Wine, Food, & Culture', level: '2', description: 
    'Teaches insight on the history of wine and how wine influences food and culture', image: './images/HOS2228.jpg'}

]

// Function name: courseItem
// Returns a formated HTML string of the course.
// Source for idea of generating a html string for innerHTML method
// Source: https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML
function courseItem(course) {
    return "<div class='course'>" + 
                "<div class='course-image'>" +
                    "<img src=\"" + course.image + "\" alt= \"" + course.title + "\">" + 
                "</div>" +
                "<div class='course-info'>" + 
                    "<p>Course Code: " + course.courseCode + "<br>" +
                    "Title: " + course.title + "<br>" +
                    "Level: " + course.level + "<br>" +
                    "Description:<br>" +
                    course.description + "</p>" +
                "</div>" +
            "</div>";
}
// Function Name: loadAllCourses
// Load all courses onto course page
function loadAllCourses() {
    // Sets level 1 and 2 checked and sort by lowest level is set
    document.querySelector("#level1").checked = true;
    document.querySelector("#level2").checked = true;
    document.querySelector("#lowest").checked = true;
    let coursePage = document.querySelector("#course-content");
    // Create content for all courses on course webpage
   for(let course of courses) {
        coursePage.innerHTML += courseItem(course); 
   }
}

// Function Name: loadSelectedCourses
// Load selected courses based on the filtering and sorting options
function loadSelectedCourses() {
    // Get current values of course level filters
    let level1 = document.querySelector("#level1").checked;
    let level2 = document.querySelector("#level2").checked;
    let lowest = document.querySelector("#lowest").checked;
    let highest = document.querySelector("#highest").checked;
    
    // Points to course content page
    let coursePage = document.querySelector("#course-content");
    
    let output;

    // Filter only level 1 courses
    if((level1 === true) && (level2 === false)) {
        output = courses.filter((course) => { return course.level === '1'; });
    }
    // Filter only Level 2 courses
    else if((level1 === false) && (level2 === true)) {
        output = courses.filter((course) => { return course.level === '2'; });
    }
    // Filter all courses based on lowest level first
    else if((level1 === true) && (level2 === true)) {
        if(lowest === true) {
            output = courses.filter((course) => { return course.level === '1'; });
            output = output.concat(courses.filter((course) => { return course.level === '2'; }));
        }
        // Filter all courses based on highest level first
        else if(highest === true) {
            output = courses.filter((course) => { return course.level === '2'; });
            output = output.concat(courses.filter((course) => { return course.level === '1'; }));
        }
    }
    
    // Clear webpage
    coursePage.innerHTML = "";
    // Output filtered results to course webpage
    for(let i = 0; i < output.length; i++) {
        coursePage.innerHTML += courseItem(output[i]);
    }
}

// Function Name: searchCourse
// Searches course code on course page and outputs result to course page
/* Source for search bar functionality in javascript:
URL:https://www.geeksforgeeks.org/search-bar-using-html-css-and-javascript/*/
function searchCourse() {
    // Get current value in search textbox and convert to uppercase
    let text = document.querySelector("#txtsearch").value;
    text = text.toUpperCase();

    // Points to course content page
    let coursePage = document.querySelector("#course-content");

    // Get current course information sections on course page 
    let infoPage = document.getElementsByClassName('course-info');

    // Search course information for matching course code then output result to course page
    for(let i = 0; i < infoPage.length; i++) {
        if(infoPage[i].innerHTML.toUpperCase().includes(text)) {
            let output = courses.filter((course) => { return course.courseCode === text; });
            console.log(output);
            coursePage.innerHTML = "";
            coursePage.innerHTML += courseItem(output[0]);
        }
    }
}