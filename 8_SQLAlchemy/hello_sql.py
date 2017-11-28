from sqlalchemy import *
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, scoped_session

engine  = create_engine('postgresql://test:test@localhost:5432/test_db', echo=True)
Base    = declarative_base(bind=engine)
Session = sessionmaker(bind=engine)
session = Session()

class TestObject(Base):
    __tablename__ = 'test_table'

    name     = Column(String, primary_key=True)
    age      = Column(Integer)
    balance  = Column(Float)

Base.metadata.create_all()

test_object = TestObject(name='bob',age='32',balance='120.55')

session.add(test_object)

#Try a query
test_object_query = session.query(TestObject).filter_by(name="bob").first()
print test_object_query

session.commit()
