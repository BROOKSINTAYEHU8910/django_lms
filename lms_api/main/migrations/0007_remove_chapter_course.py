# Generated by Django 4.1.1 on 2022-10-07 17:19

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0006_rename_course_chapter_course'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='chapter',
            name='course',
        ),
    ]
