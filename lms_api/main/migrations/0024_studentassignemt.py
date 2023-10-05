# Generated by Django 4.1.1 on 2022-10-15 19:10

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0023_alter_courserating_options'),
    ]

    operations = [
        migrations.CreateModel(
            name='StudentAssignemt',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=300)),
                ('detail', models.TextField(null=True)),
                ('add_time', models.DateTimeField(auto_now_add=True)),
                ('student', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='main.student')),
            ],
            options={
                'verbose_name_plural': '9.  Student Assignment ',
            },
        ),
    ]
