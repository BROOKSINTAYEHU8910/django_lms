# Generated by Django 4.1.1 on 2022-10-08 22:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0010_alter_course_teacher'),
    ]

    operations = [
        migrations.AddField(
            model_name='teacher',
            name='detail',
            field=models.TextField(null=True),
        ),
    ]
