from sqlalchemy import *
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, scoped_session, relationship

engine  = create_engine('postgresql://test:test@localhost:5432/test_db', echo=True)
Base    = declarative_base(bind=engine)
Session = sessionmaker(bind=engine)
session = Session()

class TestObject(Base):
    __tablename__ = 'test_table'

    name       = Column(String, primary_key=True)
    age        = Column(Integer)
    balance    = Column(Float)
    categories = relationship('Category')

class Category(Base):
    __tablename__   = "categories"
    id              = Column(Integer,primary_key=True)
    category        = Column(String)
    testobject_name = Column(Integer, ForeignKey('test_table.name'))


Base.metadata.create_all()

#test_object = TestObject(name='bob',age='32',balance='120.55')

q = session.query(TestObject).join(Category, TestObject.name == Category.testobject_name).all()

#Try a query
print "START"
print q[0].name, q[0].categories[0].category
print q[1].name, q[1].categories
