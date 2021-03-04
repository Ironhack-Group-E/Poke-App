![Alt Text](https://github.com/Ironhack-Group-E/Poke-App/blob/main/FireShot%20Capture%20071%20-%20PokemonClient%20-%20localhost.png)


# Poke-App

Are you a POKEMON fan???.

So are we!!!!! Enjoy PokeApp and try to catch'em all!!! 

## Instalation

1. Download the project from the repository. 

2. Create your database using the tables provided.

3. Run backend (`mvn spring-boot:run`)

4. Set up Angular Material by running the following command: `ng add @angular/material` 

5. Instead of choosing a prebuilt theme, select **CUSTOM** theme, say **NO** to Angular Material typography and **YES** to browser animation.

6. You must also delete the following line from index.html 
    ```
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap" rel="stylesheet">
    ```
    
7. And delete these lines from style.css
    ```
    html, body { height: 100%; }
    body { margin: 0; font-family: Roboto, "Helvetica Neue", sans-serif; }
    ```

8. Run frontend (`ng serve -o`). 
  
9. ENJOY!!!!

In case you face any problem during running frontend, it may be due to a version problem. In any case, it will be fixed by running the following commands:

```
npm install @angular/cli@11.2.3
npm install @angular/core@11.2.3
npm install @angular/cdk@11.2.3 
npm install popper.js@^1.16.1
```


## Functionalities 

The functionalities are shown below.

- **Create your trainer:** Fill the fields of our form to create as many trainers as you want.
- **Create your team:** Each trainer can have their own team formed by 7 pokemons... Yeah we kwon its usually 6 but Ironhack has its own poke-rules.
- **Pokedex:** Check the stats of every pokemon on our magnificent pokedex. Adapted to the new technologies available but with that retro feeling we all love.

## Extra Functionalities 

- Erase both Trainers and Pokemons.
- Autocompletion for better pokemon search.
- Search bar on Pokedex page.
- Upload a local image for a trainer avatar (some images may not be displayed correctly, use the images inside resources/img on the backend proyect to test)

## Diagrams

- Case Diagram:

![alt text](https://github.com/Ironhack-Group-E/Poke-App/blob/main/PokeApp_User_Case_Diagram.jpg)

- Class Diagram:

![alt text](https://github.com/Ironhack-Group-E/Poke-App/blob/main/PokeApp_Class_Diagram.jpg)



No Auth needed.
