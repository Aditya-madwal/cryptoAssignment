# Generated by Django 5.0.4 on 2024-09-07 17:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='usercrypto',
            name='quantity',
            field=models.IntegerField(default=0),
        ),
    ]
