# Generated by Django 4.1.1 on 2022-10-18 13:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0026_studentassignemt_student_status'),
    ]

    operations = [
        migrations.AlterField(
            model_name='studentassignemt',
            name='student_status',
            field=models.BooleanField(default=False),
        ),
    ]