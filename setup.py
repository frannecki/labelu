from setuptools import setup

setup(
    name='labelu',
    packages=['labelu'],
    include_package_data=False,
    install_requires=[
        'flask',
        'sqlalchemy'
    ],
)
