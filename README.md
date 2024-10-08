# Node-And-Database-Johnemon™ Challenge

## Overview

Welcome to the **Node-And-Database-Johnemon™ Challenge**! Building upon your experience from the **Johnemon™ Challenge**, this challenge will guide you through enhancing your terminal-based Johnemon™ game by integrating a database for data persistence. You'll reuse and extend your existing code to incorporate either **SQLite3** or **MariaDB**, allowing for more robust data management and scalability.

The goal of this challenge is to deepen your understanding of Node.js, database integration, and data handling while maintaining the fun and interactive elements of the Johnemon™ universe.

As always, go the extra mile, apply your skills creatively, and most importantly, have fun!

---

## Part One: Setting Up the Database

### Objective
Integrate a database into your existing Johnemon™ game to handle data persistence, replacing the `save.json` file.

### Tasks

1. **Choose Your Database:**
	- **SQLite3**: A lightweight, file-based database that's easy to set up.
	- **MariaDB**: A robust, server-based relational database suitable for larger applications.

2. **Install Necessary Packages:**
	- For **SQLite3**:
	  ```bash
      npm install sqlite3
      ```
	- For **MariaDB**:
	  ```bash
      npm install mariadb
      ```

3. **Database Setup:**
	- **SQLite3**:
		- Create a new SQLite database file (e.g., `johnemon.db`).
		- Define tables to store `JohnemonMaster`, `Johnemon™Collection`, `Items`, and `Logs`.
	- **MariaDB**:
		- Set up a MariaDB server if not already running.
		- Create a new database (e.g., `johnemon_db`).
		- Define tables similar to the SQLite3 setup.

4. **Configure Database Connection:**
	- Create a separate configuration file (e.g., `dbConfig.js`) to manage your database connections securely.

### Deliverables
- A configured database with the necessary tables.
- A `dbConfig.js` file managing the database connection.

---

## Part Two: Refactoring the Johnemon™ Classes for Database Integration

### Objective
Modify your existing `Johnemon™`, `Johnemon™Master`, and `Johnemon™World` classes to interact with the database instead of using in-memory data or `save.json`.

### Tasks

1. **Johnemon™ Class:**
	- Update the constructor to fetch and store data from the database.
	- Implement methods to save, update, and delete Johnemon™ instances in the database.

2. **Johnemon™Master Class:**
	- Refactor methods to interact with the database for operations like adding or removing Johnemon™ from the collection.
	- Ensure that healing items, revive items, and JOHNEBALLS are stored and updated in the database.

3. **Johnemon™World Class:**
	- Modify behaviors to log events directly into the database.
	- Manage the `day` attribute within the database to maintain state across sessions.

4. **Data Relationships:**
	- Define relationships between tables (e.g., One-to-Many between `Johnemon™Master` and `Johnemon™Collection`).

### Deliverables
- Refactored class definitions with database interactions.
- Updated methods that perform CRUD operations on the database.

---

## Part Three: Implementing Save and Load Functionality with the Database

### Objective
Eliminate the use of `save.json` by implementing persistent save and load functionalities using the database.

### Tasks

1. **Saving Game State:**
	- Create a method to save the current game state to the database, including the `Johnemon™Master`, their collection, items, current day, and logs.

2. **Loading Game State:**
	- Develop a method to load the game state from the database when the game starts.
	- Ensure that all related data (e.g., Johnemon™Collection, Items, Logs) are correctly retrieved and instantiated.

3. **Handling Multiple Users:**
	- If applicable, allow multiple `Johnemon™Master` profiles by associating each with unique user identifiers.

4. **Data Integrity:**
	- Implement transactions where necessary to maintain data integrity during save and load operations.

### Deliverables
- Functional save and load methods utilizing the database.
- Removal of `save.json` from the project.

---

## Part Four: Enhancing User Interaction with Database Features

### Objective
Leverage the database to enhance user interactions, such as displaying leaderboards, tracking statistics, and managing multiple game sessions.

### Tasks

1. **User Authentication (Optional):**
	- Implement a simple authentication system allowing users to create accounts and log in.
	- Store user credentials securely in the database.

2. **Leaderboards:**
	- Create a leaderboard feature displaying top `Johnemon™Masters` based on criteria like highest levels, most Johnemon™, or most battles won.

3. **Statistics Tracking:**
	- Track and store statistics such as number of battles fought, wins, losses, and Johnemon™ caught.
	- Display these statistics to the user upon request.

4. **Multiple Game Sessions:**
	- Allow users to have multiple save states or game sessions, enabling them to switch between different game progressions.

### Deliverables
- Enhanced features utilizing database capabilities.
- Updated user interface prompts to access new features.

---

## Part Five: Updating the Game Flow for Database Integration

### Objective
Ensure that the overall game flow seamlessly integrates with the database, maintaining smooth user experience and data consistency.

### Tasks

1. **Game Initialization:**
	- On starting the game (`node Game.js`), check the database for existing save states or user profiles.
	- Prompt the user to select a profile or create a new one.

2. **User Prompts and Inputs:**
	- Update all user prompts to interact with the database-backed data.
	- Ensure inputs correctly reflect the current state from the database.

3. **Error Handling:**
	- Implement robust error handling for database operations, providing user-friendly messages and fallback options.

4. **Performance Optimization:**
	- Optimize database queries to ensure quick data retrieval and updates, enhancing the overall game performance.

### Deliverables
- A seamless game flow integrated with the database.
- Enhanced user prompts and interactions reflecting the persistent data.

---

## Part Six: Advanced Features with Database Capabilities

### Objective
Expand your game with advanced features that leverage the power of the database, providing a richer and more engaging experience.

### Tasks

1. **Dynamic Events:**
	- Store a variety of events in the database, allowing for dynamic and randomized daily events.
	- Implement functionality to add, update, or remove events without altering the codebase.

2. **Inventory Management:**
	- Create an inventory system for `Johnemon™Masters` to manage items more effectively.
	- Allow purchasing, selling, and trading of items, with transactions recorded in the database.

3. **Trade System:**
	- Enable `Johnemon™Masters` to trade Johnemon™ with each other.
	- Ensure trades are securely processed and reflected in the database.

4. **Achievements and Rewards:**
	- Implement an achievements system, rewarding users for reaching milestones.
	- Store and display achievements from the database.

### Deliverables
- Advanced game features utilizing database storage and retrieval.
- Enhanced user engagement through dynamic and interactive systems.

---

## Part Seven: Testing and Deployment

### Objective
Ensure your game is robust, free of bugs, and ready for deployment by conducting thorough testing and preparing deployment scripts.

### Tasks

1. **Unit Testing:**
	- Write unit tests for your classes and database interactions using frameworks like **Jest** or **Mocha**.
	- Ensure all functionalities perform as expected.

2. **Integration Testing:**
	- Test the integration between different components, such as class methods and database operations.
	- Verify that data flows correctly throughout the game.

3. **Deployment Preparation:**
	- Prepare scripts for setting up the database in different environments.
	- Document setup instructions for future deployments.

4. **Continuous Integration (Optional):**
	- Set up CI/CD pipelines to automate testing and deployment processes.

### Deliverables
- Comprehensive test suites ensuring game reliability.
- Deployment-ready codebase with clear setup instructions.

---

## Bonus

Feel free to add as many features as you want to enhance the game further. Here are some ideas for inspiration:

- **Advanced Evolution Mechanics:** Implement unique evolution paths based on experience or specific conditions.
- **Item Crafting:** Allow users to craft new items using resources collected during gameplay.
- **Multi-User Support:** Enable multiplayer features where users can interact, battle, and trade in real-time.
- **Graphical Interface:** Transition from a terminal-based game to a graphical user interface using frameworks like **Electron**.
- **API Integration:** Create a RESTful API for your game, allowing for potential web or mobile integrations.
- **Real-Time Notifications:** Implement real-time updates and notifications for in-game events using WebSockets.
- **AI Opponents:** Develop intelligent AI opponents with varying difficulty levels for more challenging battles.
- **Persistent Music and Sound Effects:** Integrate background music and sound effects that enhance the gaming experience.
- **Data Analytics:** Analyze player data to provide insights or personalized experiences.

---

## Class Diagram of the Enhanced Game

```plaintext
classDiagram
    class Johnemon {
        +string name
        +int level
        +int experienceMeter
        +int attackRange
        +int defenseRange
        +int healthPool
        +string catchPhrase
        +attack(target: Johnemon)
        +gainExperience(amount: int)
        +sayCatchPhrase()
        +evolve()
    }

    class JohnemonMaster {
        +string name
        +Johnemon[] collection
        +int healingItems
        +int reviveItems
        +int johneballs
        +healJohnemon(johnemon: Johnemon)
        +reviveJohnemon(johnemon: Johnemon)
        +catchJohnemon(johnemon: Johnemon)
        +releaseJohnemon(johnemon: Johnemon)
        +showCollection()
    }

    class JohnemonWorld {
        +int day
        +string[] logs
        +oneDayPasses()
        +addLog(log: string)
    }

    class JohnemonArena {
        +startFight(masterJohnemon: Johnemon, wildJohnemon: Johnemon)
    }

    class Database {
        +connect()
        +disconnect()
        +query(sql: string)
    }

    JohnemonMaster --> Johnemon : has
    JohnemonWorld --> JohnemonMaster : contains
    JohnemonArena --> JohnemonMaster : uses
    JohnemonArena --> Johnemon : interacts with
    JohnemonWorld --> Database : logs to
    JohnemonMaster --> Database : manages
    Johnemon --> Database : stores data
```

---

## Getting Started

1. **Clone Your Previous Project:**
	- Ensure you have your existing **Johnemon™ Challenge** project ready to be extended.

2. **Set Up the Database:**
	- Choose between **SQLite3** or **MariaDB** based on your preference and project requirements.
	- Follow the setup instructions in Part One to configure your database.

3. **Refactor Your Code:**
	- Begin integrating database interactions into your existing classes as outlined in Parts Two and Three.

4. **Test Incrementally:**
	- After each major change, test your game to ensure everything functions correctly with the new database integrations.

5. **Enhance and Expand:**
	- Once the core functionalities are working with the database, proceed to implement the advanced features in Parts Four to Seven.


---

## Notes

- **Starter Code:** You may use or modify any starter code provided, but feel free to restructure files and functions as needed to accommodate database integration.
- **No Tests Provided:** Similar to the previous challenge, there are no predefined tests. Focus on writing your own tests to ensure your code works as intended.
- **Documentation:** Maintain clear and concise documentation for your code, especially around database schemas and interactions.

---

Embark on this enhanced journey to create a more dynamic and persistent Johnemon™ world. Leveraging databases will not only make your game more robust but also prepare you for real-world applications where data management is crucial. Happy coding!
