import sqlalchemy
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, ForeignKey, MetaData, DateTime
from util import generate_uuid_string

Base = declarative_base()

class Image(Base):
    __tablename__ = "image"
    id = Column(Integer, primary_key=True)
    uid = Column(String(), unique=True, nullable=False)
    file = Column(String(), unique=True, nullable=False)
    modified_at = Column(DateTime)
    instances = relationship("Instance", back_populates="image")

class Instance(Base):
    __tablename__ = "instance"
    id = Column(Integer, primary_key=True)
    file = Column(String(), nullable=False)
    image_id = Column(Integer, ForeignKey(Image.id), nullable=False)
    image = relationship("Image", back_populates="instances")
    label = Column(Integer)
    modified_at = Column(DateTime)

def db_factory(uri, get_engine=False, create=False):
    engine = sqlalchemy.create_engine(uri)
    if create:
        Base.metadata.drop_all(engine)
        Base.metadata.create_all(engine)
    factory = sqlalchemy.orm.sessionmaker(bind=engine)
    if get_engine:
        return factory, engine
    else:
        return factory
