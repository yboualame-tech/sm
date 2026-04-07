#include <stdlib.h>
#include "../include/food.h"
#include "../include/snake.h"

Food* food_create(void) {
    Food* food = (Food*)malloc(sizeof(Food));
    if (food == NULL) {
        return NULL;
    }
    food_generate(food);
    return food;
}

void food_free(Food* food) {
    if (food != NULL) {
        free(food);
    }
}

void food_generate(Food* food) {
    food->x = rand() % GRID_WIDTH;
    food->y = rand() % GRID_HEIGHT;
}

int food_eaten(Food* food, int snake_head_x, int snake_head_y) {
    return (food->x == snake_head_x && food->y == snake_head_y);
}
