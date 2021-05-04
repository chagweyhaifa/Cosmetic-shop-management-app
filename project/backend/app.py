from typing import Optional
from fastapi import FastAPI, Request, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
import mysql.connector
import json
import shutil

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def connectToDB():
    db = mysql.connector.connect(
        host="localhost", user="root", password="", database="cosmeto", port=3307)
    return db


@app.get("/")
def displayProducts():
    mydb = connectToDB()
    myCursor = mydb.cursor()
    sql_query = "select * from products"

    myCursor.execute(sql_query)
    # list of tuples
    list_of_rows = myCursor.fetchall()
    # list of dict
    items = []
    for i in list_of_rows:
        item = {}
        item['id'] = i[0]
        item['name'] = i[1]
        item['description'] = i[2]
        item['price'] = i[3]
        item['category'] = i[4]
        item['image'] = i[5]
        items.append(item)
    return items


@app.get("/deleteProduct")
def deleteBook(id: int):
    mydb = connectToDB()
    myCursor = mydb.cursor()
    sql_query = "delete from products where id = %s;"

    myCursor.execute(sql_query, (id,))
    mydb.commit()
    return "record succefully deleted"


@app.post("/addProduct")
async def addBook(request: Request):
    mydb = connectToDB()
    myCursor = mydb.cursor()

    body = json.loads(await request.body())
    sql_query = "insert into products(name, description, price, category) values(%s,%s,%s,%s) ;"
    myCursor.execute(
        sql_query, (body["name"], body["description"], body["price"], body["category"]))
    mydb.commit()

    return myCursor.lastrowid

    # return "Record inserted successfully"


@app.get("/getProduct")
def getBook(id: int):
    mydb = connectToDB()
    myCursor = mydb.cursor()
    sql_query = "select * from products where id = %s"

    myCursor.execute(sql_query, (id,))

    row = myCursor.fetchone()
    item = {}
    item['id'] = row[0]
    item['name'] = row[1]
    item['description'] = row[2]
    item['price'] = row[3]
    item['category'] = row[4]
    item['image'] = row[5]
    print(item)
    return item


@app.post("/editProduct")
async def addBook(request: Request):
    mydb = connectToDB()
    myCursor = mydb.cursor()

    body = json.loads(await request.body())
    sql_query = "update products set name = %s, description= %s, price = %s, category =%s where id = %s;"
    myCursor.execute(
        sql_query, (body["name"], body["description"], body["price"], body["category"], body["id"]))
    mydb.commit()
    return "Record edited successfully"


@app.post("/files/")
async def create_upload_file(image: UploadFile = File(...), id: str = Form(...)):
    mydb = connectToDB()
    myCursor = mydb.cursor()
    sql_query = "update products set image = %s where id = %s;"
    myCursor.execute(
        sql_query, (image.filename, id))
    mydb.commit()

    with open("../angular-frontend/src/assets/" + image.filename, "wb") as buffer:
        shutil.copyfileobj(image.file, buffer)

    return {"filename": image.filename}
