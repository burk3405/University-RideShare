# University-RideShare
Ridesharing platform for a smart city university campus. Drivers share their car by picking up passengers along the way.

## Project Requirements:
- User Authentication & Profiles
  * Develop the login, registration, and user management features. Ensure secure storage of user data.
- Ride Requests and Accepts
  * Create functionalities for requesting and accepting a ride. Design task categories. Store time taken to complete a task. Implement deadlines and recurring tasks.
  * Implement commenting, file attachment, and sharing features within tasks. Ensure real-time updates.
  * Rating for both the driver and passenger, calculated using the chess elo formula.
- Dashboard
  * Create dashboards that visualize rides and metrics. Develop reports for individual and overall performance.
- User Interface
  * Focus on the overall user interface and user experience (UI/UX). Ensure the app is responsive and intuitive, using a modern framework (e.g., React).
- Online Database
  * Database management, data handling and security measures.

## Technical Requirements:
- Authentication via a formal authentication system: **auth0**
- Online Database: **Neon**
- Online Storage: (Google Cloud Storage via Google Cloud Storage, Firebase, Azure, Amazon, Dropbox)
- Online Hosting: **Netlify**
- Code Versioning and Featuring: **GitHub**
- Project Management Board: **Jira**
- AI Based Feature: (still looking)
- Frontend: **React**
- Backend: **NodeJS**





























1. Two Functional Requirements: Passenger who Requests Rides. Driver who Accepts Rides. These will be two different UI's that the user will have access to within the App. The default option will be passenger, as there are far more people who need a ride than people with a car offering rides. I imagine the idea of this App will be similar to Uber or Lyft. Maybe implement feature to let passenger choose from options of drivers available, and vice versa. The main structure pairing passengers and drivers is in the pseudocode below. Calculate the total trip time to the user using on-campus speed limits.
2. Two Non-Functional Requirements: A* Algorithm used to provide the route to get from point A to B. Relational Database storing previous transactions of Driver and Passenger with the entity relationship of Chauffeured, along with a 5-star based rating of the ride, to encourage good behavior of the users. Passengers rate the driver and Drivers rate the passenger, if one of their scores gets below a certain number, they are kicked off the app. These requirements are non-functional because they are not necessary for the production of this app, but they would be nice to have later on.
3. One Key Constraint: Number of users on the system should not be greater than (~a percentage of) the total number of students enrolled in the university. This will provide a much-needed constraint on our system, so that only the people who need it will be using it and the university can make sure they are saving on any costs related to this project.

Answer 2:
1. Main components of the system: Drivers, Passengers, Vehicles, and Rides. Entity relationships are all many to many. Driver operates Vehicle, Driver transacted Ride, Driver chauffeured Passenger, and Passenger sat on Ride.
2. Image uploaded as attachment (y/n): Yes
3. Vehicle has members VIN int, make string, model string, year int, color string, licensePlateNo string, registration string. Driver has members ID string, firstName string, lastName string, SSN int, stateLicenseNo int. Passenger has members ID string, firstName string, lastName string, creditCardInfo int. Ride has members ID string, driverID string, passengerID string, length double, time double, startingPoint string, endingPoint string, driverRating double, passengerRating double.

Answer 3:
Part 1. Location Function: This function will detail how close to other users the App should allow for pickups and drop-offs. Act as a clone of Uber Pool, where multiple passengers take advantage of the seats of 1 car. 

Inputs() {
    long int PassengerA_Latitude;
    long int PassengerA_Longitude;
    long int PassengerB_Latitude;
    long int PassengerB_Longitude;
    int MaximumCapacity;
    int VehicleSeatsOpen(); // number of passenger seats in the car, calculated from Make and Model. (What would the advantage of storing this as a bool over an integer be in the real world? Would it be significantly more efficient to compare against true/false rather than calculating the amount of open seats each time?)
    static int AllowedDetour; // hardcoded time of detour allowed between passengers in minutes
    string passengerA_Name;
    string passengerB_Name;
    passengerA_PickUpLocation;
    passengerA_DropOffLocation;
    passengerB_PickUpLocation;
    passengerB_DropOffLocation;
}
Outputs() {
   passengerA_Route;
   passengerB_Route;
   passengerA_Rating;
   passengerB_Rating
   driver_Rating;
}
function MainLogic() {
   if vehicleSeatsOpen < maximumCapacity & passengerB_PickUpLocation along passengerA_Route() {
       grab passengerB;
   else
       keep moving;
   }

   if vehicleSeatsOpen = maximumCapacity
       keep moving;

  if vehicleSeatsOpen & passengerB_PickUpLocation = passengerA_DropOffLocation
      grab passengerB;


  if vehicleSeatsOpen & passengerB_PickUpLocation !along passengerA_Route
      keep moving;

  if vehicleSeatsOpen & passengerB_PickUpLocation (1 minute away from) passengerA_Route
    detour to grab passengerB;
}


// Future adaptations of this would include calculating the landmark locations from their coordinates +- for error, and adding those landmark locations as easily searchable places the user can select in the app. These include: Park&Rides, Library, Dining Halls, Gym, Dorm Buildings, and other important off campus locations.

