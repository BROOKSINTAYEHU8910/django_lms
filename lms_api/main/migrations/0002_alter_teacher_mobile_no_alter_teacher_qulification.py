# Generated by Django 4.1.1 on 2022-09-23 22:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='teacher',
            name='mobile_no',
            field=models.CharField(max_length=20),
        ),
        migrations.AlterField(
            model_name='teacher',
            name='qulification',
            field=models.CharField(max_length=200),
        ),
    ]
