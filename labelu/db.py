import sqlalchemy
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, ForeignKey, DateTime

Base = declarative_base()


class Group(Base):
    r"""Group of images corresponding to the same sample slide"""
    __tablename__ = "image"
    id = Column(Integer, primary_key=True)
    uid = Column(String(), unique=True, nullable=False)
    label = Column(Integer)
    instances = relationship("Instance", back_populates="group")
    modified_at = Column(DateTime)


class Instance(Base):
    r"""Image instance"""
    __tablename__ = "instance"
    id = Column(Integer, primary_key=True)
    uid = Column(String(), unique=True, nullable=False)
    file = Column(String(), nullable=False)
    group_id = Column(Integer, ForeignKey(Group.id), nullable=False)
    group = relationship("Group", back_populates="instances")
    modified_at = Column(DateTime)


def db_factory(uri: str, get_engine: bool = False, create: bool = False):
    r"""Database session factory

    Args:
        uri: database uri, i.e. sqlite:///labelu.sqlite
        get_engine: if True also return sqlite db Engine object
        create: if True drop all tables and create new
    """
    engine = sqlalchemy.create_engine(uri)
    if create:
        Base.metadata.drop_all(engine)
        Base.metadata.create_all(engine)
    factory = sqlalchemy.orm.sessionmaker(bind=engine)
    if get_engine:
        return factory, engine
    else:
        return factory
