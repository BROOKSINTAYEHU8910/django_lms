# Generated by Django 4.1.1 on 2022-10-07 17:05

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0005_alter_student_options_chapter'),
    ]

    operations = [
        migrations.RenameField(
            model_name='chapter',
            old_name='Course',
            new_name='course',
        ),
    ]