# Generated by Django 4.1.1 on 2022-10-17 19:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0025_studentassignemt_teacher'),
    ]

    operations = [
        migrations.AddField(
            model_name='studentassignemt',
            name='student_status',
            field=models.TextField(null=True),
        ),
    ]
