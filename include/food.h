#ifndef FOOD_H
#define FOOD_H

typedef struct {
    int x;
    int y;
} Food;

Food* food_create(void);
void food_free(Food* food);
void food_generate(Food* food);
int food_eaten(Food* food, int snake_head_x, int snake_head_y);
void food_render(Food* food);

#endif
