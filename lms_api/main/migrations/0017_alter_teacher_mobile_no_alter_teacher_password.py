# Generated by Django 4.1.1 on 2022-10-13 23:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0016_remove_teacher_detail'),
    ]

    operations = [
        migrations.AlterField(
            model_name='teacher',
            name='mobile_no',
            field=models.CharField(blank=True, max_length=20, null=True),
        ),
        migrations.AlterField(
            model_name='teacher',
            name='password',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]