from fastapi import FastAPI,HTTPException
from fastapi.middleware.cors import CORSMiddleware
from model import Todo
app = FastAPI()


from database import (
    fetch_all_todos,
    fetch_one_todo,
    create_todo,
    update_todo,
    remove_todo
)

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def main():
    return {"message": "Hello World"}


@app.get("/api/todo")
async def get_todo():
    response = await fetch_all_todos()
    return response

@app.get("/api/todo{title}" , response_model = Todo)
async def get_todo_byid(title:str):
    response = await fetch_one_todo(title)
    if response:
        return response
    raise HTTPException(404 ,"there is no todo item with this title{title}")

@app.post("/api/todo",response_model= Todo)
async def post_todo(todo:Todo):
    response = await create_todo(todo.dict())
    if response:
        return response
    raise HTTPException(400,"Something went wrong / Bad Request")

@app.put("/api/todo{title}" ,response_model = Todo)
async def put_todo(title:str , desc:str):
    response = await update_todo(title,desc)
    if response:
        return response
    raise HTTPException(404,f"There is no ToDo item with thsi title {title}")

@app.delete("/api/todo{title}")
async def delete_todo(title):
    response = await remove_todo(title)
    if response:
        return "Successfully delete to do item"
    raise HTTPException(404,f"There is no ToDo item with thsi title {title}")


